// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    using Microsoft.Owin.Hosting;
    using NLog;
    using System;

    public sealed class HttpServer
    {
        private static readonly Logger log = LogManager.GetLogger("HttpServer");
        private const string baseAddressTemplate = "http://+:{0}/";
        private readonly int port;
        private IDisposable server = null;

        public HttpServer(int port)
        {
            this.port = port;
        }

        public void Start()
        {
            if (server != null)
            {
                server.Dispose();
                server = null;
                log.Warn("Needed to stop exising Http Server during start. This should not happen.");
            }

            if (baseAddressTemplate.Contains("https")) // For HTTPS
            {
                var baseAddress = string.Format(baseAddressTemplate, port);
                var options = new StartOptions(baseAddress) { ServerFactory = "Microsoft.Owin.Host.HttpListener" };
                server = WebApp.Start<Startup>(options);
                log.Info("Started Https Server at {0}", baseAddress);
            }
            else // For HTTP
            {
                var baseAddress = string.Format(baseAddressTemplate, port);
                server = WebApp.Start<Startup>(url: baseAddress);
                log.Info("Started Http Server at {0}", baseAddress);
            }
        }

        public void Stop()
        {
            if(server != null)
            {
                server.Dispose();
                server = null;
                log.Warn("Stopped Http Server.");
            }
        }
    }
}