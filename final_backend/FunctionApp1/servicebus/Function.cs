using System;
using System.Threading.Tasks;
using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace FunctionApp1.servicebus;

public class Function
{
    private readonly ILogger<Function> _logger;

    public Function(ILogger<Function> logger)
    {
        _logger = logger;
    }

    [Function(nameof(Function))]
    public async Task Run(
        [ServiceBusTrigger("queue0", Connection = "servicebusconnection")]
        string msg)
    {
        _logger.LogInformation(msg);
    }
}