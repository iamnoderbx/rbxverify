import LinkedStatus from "./LinkStatus.ts";

abstract class DynamicLink {
    abstract token: string | undefined | null;
    dynamic_link_status: any;

    constructor() {
        this.dynamic_link_status = LinkedStatus.Unavailable;
    }

    status(status: any) {
        this.dynamic_link_status = status;
        return this;
    };

    getLinkStatus() {
        return this.dynamic_link_status;
    }
}

export { DynamicLink};