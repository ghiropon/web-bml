export type ComponentPMT = {
    pid: number,
    componentId: number,
    bxmlInfo?: AdditionalAribBXMLInfo,
};

export type AdditionalAribBXMLInfo = {
    transmissionFormat: number,
    entryPointFlag: boolean,
    entryPointInfo?: AdditionalAribBXMLEntryPointInfo,
    additionalAribCarouselInfo?: AdditionalAribCarouselInfo,
};

export type AdditionalAribBXMLEntryPointInfo = {
    autoStartFlag: boolean,
    documentResolution: number,
    useXML: boolean,
    defaultVersionFlag: boolean,
    independentFlag: boolean,
    styleForTVFlag: boolean,
    bmlMajorVersion: number,
    bmlMinorVersion: number,
    bxmlMajorVersion?: number
    bxmlMinorVersion?: number,
};

export type AdditionalAribCarouselInfo = {
    dataEventId: number,
    eventSectionFlag: boolean,
    ondemandRetrievalFlag: boolean,
    fileStorableFlag: boolean,
    startPriority: number,
};

export type PMTMessage = {
    type: "pmt",
    components: ComponentPMT[],
};

export type MediaType = {
    type: string,
    originalType: string,
    subtype: string,
    originalSubtype: string,
    parameters: MediaTypeParameter[],
};

export type MediaTypeParameter = {
    attribute: string,
    originalAttribute: string,
    value: string,
};

export type ModuleFile = {
    contentLocation: string | null,
    contentType: MediaType,
    dataBase64: string,
};

export type ModuleDownloadedMessage = {
    type: "moduleDownloaded",
    componentId: number,
    moduleId: number,
    files: ModuleFile[],
    version: number,
    dataEventId: number,
};

export type ModuleListUpdatedMessage = {
    type: "moduleListUpdated",
    componentId: number,
    modules: number[],
    dataEventId: number,
    returnToEntryFlag?: boolean,
};

export type ESEvent = ESImmediateEvent | ESNPTEvent;

export type ESImmediateEvent = {
    eventMessageGroupId: number,
    timeMode: 0,
    eventMessageType: number,
    eventMessageId: number,
    privateDataByte: number[],
};

export type ESNPTEvent = {
    eventMessageGroupId: number,
    timeMode: 2,
    eventMessageNPT: number,
    eventMessageType: number,
    eventMessageId: number,
    privateDataByte: number[],
};

export type ESEventUpdatedMessage = {
    type: "esEventUpdated",
    componentId: number,
    events: ESEvent[],
    dataEventId: number,
};

export type ProgramInfoMessage = {
    type: "programInfo",
    originalNetworkId: number | null,
    transportStreamId: number | null,
    serviceId: number | null,
    eventId: number | null,
    eventName: string | null,
    startTimeUnixMillis: number | null,
};

export type CurrentTime = {
    type: "currentTime",
    timeUnixMillis: number,
};

export type VideoStreamUrlMessage = {
    type: "videoStreamUrl",
    videoStreamUrl: string,
};

export type ErrorMessage = {
    type: "error",
    message: string,
};

export type BITExtendedBroadcaster = {
    originalNetworkId: number,
    broadcasterId: number,
};

export type BITService = {
    serviceType: number,
    serviceId: number,
};

export type BITBroadcaster = {
    broadcasterId: number,
    broadcasterName: string | null,
    services: BITService[],
    affiliations: number[],
    affiliationBroadcasters: BITExtendedBroadcaster[],
    terrestrialBroadcasterId?: number,
};

export type BITMessage = {
    type: "bit",
    originalNetworkId: number,
    broadcasters: BITBroadcaster[],
};

export type PCRMessage = {
    type: "pcr",
     // 33-bit
    pcrBase: number,
    pcrExtension: number,
};

// parsePESを指定したときのみ
export type PESMessage = {
    type: "pes",
    streamId: number,
     // 33-bit
    pts?: number,
    data: number[],
};

export type ResponseMessage = PMTMessage |
    ModuleDownloadedMessage |
    ModuleListUpdatedMessage |
    ProgramInfoMessage |
    CurrentTime |
    VideoStreamUrlMessage |
    ErrorMessage |
    ESEventUpdatedMessage |
    BITMessage |
    PCRMessage |
    PESMessage;
