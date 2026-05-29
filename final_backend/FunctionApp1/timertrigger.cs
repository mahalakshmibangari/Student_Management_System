using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace FunctionApp1;

public class timertrigger
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;

    public timertrigger(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<timertrigger>();
        _httpClient = new HttpClient(); 
    }

    [Function("GetAllStudentsTimer")]
    public async Task Run([TimerTrigger("0 */1 * * * *")] TimerInfo myTimer)
    {
        _logger.LogInformation("Timer triggered at: {time}", DateTime.Now);

        try
        {
            
            var response = await _httpClient.GetAsync("https://localhost:44328/student/getall");

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                _logger.LogInformation("Students Data: {data}", data);
            }
            else
            {
                _logger.LogError("API call failed with status: {status}", response.StatusCode);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("Error calling API: {message}", ex.Message);
        }

        if (myTimer.ScheduleStatus is not null)
        {
            _logger.LogInformation("Next run at: {next}", myTimer.ScheduleStatus.Next);
        }
    }
}