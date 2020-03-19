// Copyright 2016 Eurofins Scientific Ltd, Ireland
// Usage reserved to Eurofins Global Franchise Model subscribers.

using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;

namespace Eurofins.ElimsNG.CLAP.LocalDeviceService
{
    public sealed class PortUsages : IDisposable
    {
        private List<PortUsage> portUsages = new List<PortUsage>();

        public bool ExistsFor(string connectionId)
            => portUsages.Any(pu => pu.ConnectionId == connectionId);

        public bool ExistsFor(string connectionId, string portName)
            => portUsages.Any(pu => pu.ConnectionId == connectionId && pu.PortName == portName);

        public bool IsPortInUse(string portName)
            => portUsages.Any(pu => pu.PortName == portName);

        public PortUsage FromPort(SerialPort port)
            => portUsages.SingleOrDefault(p => p.SerialPort == port);

        public PortUsage FromConnectionId(string connectionId)
            => portUsages.SingleOrDefault(p => p.ConnectionId == connectionId);

        public void AddUsage(string connectionId, string portName, SerialPort serialPort)
        {
            if (string.IsNullOrWhiteSpace(connectionId))
                throw new ArgumentException($"{nameof(connectionId)} cannot be empty", nameof(connectionId));

            if (string.IsNullOrWhiteSpace(portName))
                throw new ArgumentException($"{nameof(portName)} cannot be empty", nameof(portName));

            if (serialPort == null)
                throw new ArgumentNullException(nameof(serialPort));

            if (ExistsFor(connectionId, portName))
                throw new ArgumentException($"{nameof(connectionId)} {connectionId} is already using port {portName}"); 

            PortUsage newUsage = new PortUsage(connectionId, portName, serialPort);
            portUsages.Add(newUsage);
        }

        public void RemoveUsage(string connectionId)
        {
            if (string.IsNullOrWhiteSpace(connectionId))
                throw new ArgumentException($"{nameof(connectionId)} cannot be empty", nameof(connectionId));

            if (!ExistsFor(connectionId))
                throw new ArgumentException($"{nameof(connectionId)} {connectionId} is not using any ports", connectionId);

            IEnumerable<PortUsage> itemsToDispose = portUsages.Where(pu => pu.ConnectionId == connectionId).ToList();
            foreach(PortUsage itemToDispose in itemsToDispose)
                itemToDispose.Dispose();

            portUsages.RemoveAll(pu => pu.ConnectionId == connectionId);
        }

        public void RemoveUsage(string connectionId, string portName)
        {
            if (string.IsNullOrWhiteSpace(connectionId))
                throw new ArgumentException($"{nameof(connectionId)} cannot be empty", nameof(connectionId));

            if (string.IsNullOrWhiteSpace(portName))
                throw new ArgumentException($"{nameof(portName)} cannot be empty", nameof(portName));

            if (!ExistsFor(connectionId, portName))
                throw new ArgumentException($"{nameof(connectionId)} {connectionId} is not using port {portName}");

            PortUsage itemToRemove = portUsages.Single(pu => pu.ConnectionId == connectionId && pu.PortName == portName);
            itemToRemove.Dispose();
            portUsages.Remove(itemToRemove);
        }

        public void Dispose()
        {
            foreach (PortUsage portUsage in portUsages)
                portUsage.Dispose();

            portUsages.Clear();
        }
    }
}
