// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using Owin;
using System.Web.Http;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();      
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            //enable CORS globally
            appBuilder.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            // Add SignalR to the OWIN pipeline
            appBuilder.MapSignalR();

            config.MapHttpAttributeRoutes();
            
            appBuilder.UseWebApi(config);
        }
    }
}
