using Azure;
using Azure.Storage.Blobs;
using System.Text.Json;
using NewMark.PropertyManagement.Models;
using System.Net.Sockets;

namespace NewMark.Azure.Blob.Storage
{
    public class BlobStorageService : IBlobStorageService
    {
        /// <summary>
        /// Reads content from a blob using a SAS URL.
        /// </summary>
        /// <param name="blobSasUrl">The SAS URL for the blob.</param>
        /// <returns>The content of the blob as a string.</returns>
        public async Task<List<Property>> ReadBlobContentAsync(string blobSasUrl)
        {
            if (string.IsNullOrWhiteSpace(blobSasUrl))
            {
                throw new ArgumentException("Blob SAS URL cannot be null or empty.", nameof(blobSasUrl));
            }

            try
            {
                var blobClient = new BlobClient(new Uri(blobSasUrl));

                // Check if the blob exists
                if (!await blobClient.ExistsAsync())
                {
                    throw new FileNotFoundException("The specified blob does not exist.");
                }

                // Download the blob content as a stream
                using var blobStream = await blobClient.OpenReadAsync();
                using var reader = new StreamReader(blobStream);

                var content = await reader.ReadToEndAsync();

                // Deserialize JSON content into C# model
                var propertiesData = JsonSerializer.Deserialize<List<Property>>(content);

                if (propertiesData == null)
                {
                    throw new InvalidDataException("Failed to deserialize the JSON content into the property model.");
                }

                return propertiesData;
            }
            catch (SocketException ex)
            {
                throw new InvalidOperationException("Unable to resolve the hostname. Please check the Blob SAS URL.", ex);
            }
            catch (RequestFailedException ex) when (ex.Status == 401)
            {
                throw new UnauthorizedAccessException("Invalid SAS token or insufficient permissions.", ex);
            }
            catch (RequestFailedException ex) when (ex.Status == 404)
            {
                throw new FileNotFoundException("Blob not found.", ex);
            }
            catch (Exception ex)
            {                
                throw new InvalidOperationException($"An error occurred while accessing the blob: {ex.Message}", ex);
            }
        }
    }
}
