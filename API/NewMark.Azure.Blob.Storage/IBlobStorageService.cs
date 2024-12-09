using NewMark.PropertyManagement.Models;

namespace NewMark.Azure.Blob.Storage
{
    public interface IBlobStorageService
    {
        Task<List<Property>> ReadBlobContentAsync(string blobSasUrl);
    }
}
