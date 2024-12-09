using Microsoft.AspNetCore.Mvc;
using NewMark.Azure.Blob.Storage;
using System.Net.Sockets;

namespace NewMark.Property.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly IBlobStorageService _blobStorageService;

        public PropertyController(IBlobStorageService blobStorageService)
        {
            _blobStorageService = blobStorageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProperties([FromQuery] string blobSasUrl)
        
        {
            try
            {
                if (string.IsNullOrEmpty(blobSasUrl))
                {
                    return BadRequest("Blob SAS URL is required.");
                }

                var propertiesData = await _blobStorageService.ReadBlobContentAsync(blobSasUrl);

                return Ok(propertiesData);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex) when (ex.InnerException is SocketException)
            {
                return BadRequest("Failed to resolve the hostname. Please verify the Blob SAS URL.");
            }
            catch (InvalidDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }
    }
}
