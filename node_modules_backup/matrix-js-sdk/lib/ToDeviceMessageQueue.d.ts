import { MatrixClient } from "./matrix";
import { ToDeviceBatch } from "./models/ToDeviceMessage";
/**
 * Maintains a queue of outgoing to-device messages, sending them
 * as soon as the homeserver is reachable.
 */
export declare class ToDeviceMessageQueue {
    private client;
    private sending;
    private running;
    private retryTimeout;
    private retryAttempts;
    constructor(client: MatrixClient);
    start(): void;
    stop(): void;
    queueBatch(batch: ToDeviceBatch): Promise<void>;
    sendQueue: () => Promise<void>;
    /**
     * Attempts to send a batch of to-device messages.
     */
    private sendBatch;
}
//# sourceMappingURL=ToDeviceMessageQueue.d.ts.map