using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace FunctionApp1
{
    public class GetStudentByIdHttp
    {
        private readonly ILogger _logger;
        private readonly HttpClient _httpClient;

        public GetStudentByIdHttp(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<GetStudentByIdHttp>();
            _httpClient = new HttpClient();
        }

        [Function("GetStudentByIdHttp")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "student/{id:int}")] HttpRequestData req,
            int id)
        {
            _logger.LogInformation($"HTTP trigger received for ID: {id}");

            var response = req.CreateResponse();

            try
            {
                // 🔥 Call your existing API
                var apiResponse = await _httpClient.GetAsync($"https://localhost:44328/student/{id}");

                if (apiResponse.IsSuccessStatusCode)
                {
                    var data = await apiResponse.Content.ReadAsStringAsync();

                    _logger.LogInformation("Student Data: {data}", data);

                    response.StatusCode = HttpStatusCode.OK;
                    await response.WriteStringAsync(data);
                }
                else
                {
                    response.StatusCode = apiResponse.StatusCode;
                    await response.WriteStringAsync("Failed to fetch student");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error: {message}", ex.Message);

                response.StatusCode = HttpStatusCode.InternalServerError;
                await response.WriteStringAsync(ex.Message);
            }

            return response;
        }
    }
}