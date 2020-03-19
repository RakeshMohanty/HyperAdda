// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using Topshelf;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public sealed class Program
    {
        private Program()
        { }

        static void Main()
        {
            HostFactory.Run(serviceConfig =>
            {
                serviceConfig.Service<HttpServer>(service =>
                {
                    service.ConstructUsing(name => new HttpServer(9000));
                    service.WhenStarted(svcHost => svcHost.Start());
                    service.WhenStopped(svcHost => svcHost.Stop());
                });
                serviceConfig.RunAsLocalSystem();
                serviceConfig.SetDescription("Eurofins Local Device Service");
                serviceConfig.SetDisplayName("Local Device Service");
                serviceConfig.SetServiceName("LocalDeviceService");
                serviceConfig.UseNLog();
            });
        }
    }
}