import { EventQueue } from "../event_queue";
import { BMLCSS2Properties } from "./BMLCSS2Properties";
import { Resources } from "../resource";
import { aribPNGToPNG } from "../arib_png";
import { readCLUT } from "../clut";
import { defaultCLUT } from "../default_clut";
import { parseCSSValue } from "../transpile_css";
import { Buffer } from "buffer";
import { Interpreter } from "../interpreter/interpreter";
import { BMLBrowserEventTarget } from "../bml_browser";
import { convertJPEG } from "../arib_jpeg";
import { aribMNGToCSSAnimation } from "../arib_mng";
import { playAIFF } from "../arib_aiff";

export namespace BML {
    type DOMString = string;
    export function nodeToBMLNode(node: globalThis.HTMLInputElement, ownerDocument: BMLDocument): BMLInputElement;
    export function nodeToBMLNode(node: globalThis.HTMLBRElement, ownerDocument: BMLDocument): BMLBRElement;
    export function nodeToBMLNode(node: globalThis.HTMLAnchorElement, ownerDocument: BMLDocument): BMLAnchorElement;
    export function nodeToBMLNode(node: globalThis.HTMLHtmlElement, ownerDocument: BMLDocument): BMLBmlElement;
    export function nodeToBMLNode(node: globalThis.HTMLScriptElement, ownerDocument: BMLDocument): HTMLScriptElement;
    export function nodeToBMLNode(node: globalThis.HTMLObjectElement, ownerDocument: BMLDocument): BMLObjectElement;
    export function nodeToBMLNode(node: globalThis.HTMLHeadElement, ownerDocument: BMLDocument): HTMLHeadElement;
    export function nodeToBMLNode(node: globalThis.HTMLTitleElement, ownerDocument: BMLDocument): HTMLTitleElement;
    export function nodeToBMLNode(node: globalThis.HTMLSpanElement, ownerDocument: BMLDocument): BMLSpanElement;
    export function nodeToBMLNode(node: globalThis.HTMLMetaElement, ownerDocument: BMLDocument): HTMLMetaElement;
    export function nodeToBMLNode(node: globalThis.HTMLStyleElement, ownerDocument: BMLDocument): HTMLStyleElement;
    export function nodeToBMLNode(node: globalThis.HTMLElement, ownerDocument: BMLDocument): HTMLElement | BMLBeventElement | BMLBeitemElement;
    export function nodeToBMLNode(node: globalThis.HTMLBodyElement, ownerDocument: BMLDocument): BMLBodyElement;
    export function nodeToBMLNode(node: globalThis.HTMLParagraphElement, ownerDocument: BMLDocument): BMLParagraphElement;
    export function nodeToBMLNode(node: globalThis.HTMLDivElement, ownerDocument: BMLDocument): BMLDivElement;
    export function nodeToBMLNode(node: globalThis.HTMLHtmlElement, ownerDocument: BMLDocument): BMLBmlElement;
    export function nodeToBMLNode(node: globalThis.HTMLElement, ownerDocument: BMLDocument): HTMLElement;
    export function nodeToBMLNode(node: globalThis.Element, ownerDocument: BMLDocument): Element;
    export function nodeToBMLNode(node: globalThis.CDATASection, ownerDocument: BMLDocument): CDATASection;
    export function nodeToBMLNode(node: globalThis.Text, ownerDocument: BMLDocument): Text;
    export function nodeToBMLNode(node: globalThis.CharacterData, ownerDocument: BMLDocument): CharacterData;
    export function nodeToBMLNode(node: globalThis.HTMLAnchorElement, ownerDocument: BMLDocument): BMLAnchorElement;
    export function nodeToBMLNode(node: globalThis.Node, ownerDocument: BMLDocument): Node;
    export function nodeToBMLNode(node: null, ownerDocument: BMLDocument): null;
    export function nodeToBMLNode(node: globalThis.Node | null, ownerDocument: BMLDocument): Node | null {
        return node == null ? null : wrapNodeNonNull(node, ownerDocument);
    }

    export function bmlNodeToNode(node: Node | null): globalThis.Node | null {
        return node == null ? null : node["node"];
    }

    export function htmlElementToBMLHTMLElement(node: globalThis.HTMLElement | null, ownerDocument: BMLDocument): HTMLElement | null {
        if (node == null) {
            return null;
        }
        const result = wrapNodeNonNull(node, ownerDocument);
        if (!(result instanceof HTMLElement)) {
            throw new TypeError("failed to cast to BML.HTMLElement");
        }
        return result;
    }

    function wrapNode(node: globalThis.Node | null, ownerDocument: BMLDocument): Node | null {
        return node == null ? null : wrapNodeNonNull(node, ownerDocument);
    }

    function wrapNodeNonNull(node: globalThis.Node, ownerDocument: BMLDocument): Node {
        const a: any = node;
        const klass = getNodeClass(node);
        if (a.__klass) {
            if (a.__klass !== klass) {
                console.error("??", a);
            } else {
                return a.__bmlInstance;
            }
        }
        a.__klass = klass;
        const inst = new klass(node, ownerDocument);
        a.__bmlInstance = inst;
        return inst;
    }

    function getNodeClass(node: globalThis.Node): typeof Node {
        if (node instanceof globalThis.HTMLInputElement) {
            return BMLInputElement;
        } else if (node instanceof globalThis.HTMLBRElement) {
            return BMLBRElement;
        } else if (node instanceof globalThis.HTMLAnchorElement) {
            return BMLAnchorElement;
        } else if (node instanceof globalThis.HTMLHtmlElement) {
            return BMLBmlElement;
        } else if (node instanceof globalThis.HTMLScriptElement) {
            return HTMLScriptElement;
        } else if (node instanceof globalThis.HTMLObjectElement) {
            return BMLObjectElement;
        } else if (node instanceof globalThis.HTMLHeadElement) {
            return HTMLHeadElement;
        } else if (node instanceof globalThis.HTMLTitleElement) {
            return HTMLTitleElement;
        } else if (node instanceof globalThis.HTMLSpanElement) {
            return BMLSpanElement;
        } else if (node instanceof globalThis.HTMLMetaElement) {
            return HTMLMetaElement;
        } else if (node instanceof globalThis.HTMLStyleElement) {
            return HTMLStyleElement;
        } else if (node instanceof globalThis.HTMLElement && node.nodeName.toLowerCase() === "bevent") {
            return BMLBeventElement;
        } else if (node instanceof globalThis.HTMLElement && node.nodeName.toLowerCase() === "beitem") {
            return BMLBeitemElement;
        } else if (node instanceof globalThis.HTMLBodyElement) {
            return BMLBodyElement;
        } else if (node instanceof globalThis.HTMLParagraphElement) {
            return BMLParagraphElement;
        } else if (node instanceof globalThis.HTMLDivElement) {
            return BMLDivElement;
        } else if (node instanceof globalThis.HTMLHtmlElement) {
            return BMLBmlElement;
        } else if (node instanceof globalThis.HTMLElement) {
            console.error(node);
            return HTMLElement;
        } else if (node instanceof globalThis.Element) {
            return Element;
        } else if (node instanceof globalThis.CDATASection) {
            return CDATASection;
        } else if (node instanceof globalThis.Text) {
            return Text;
            // CharcterDataは誤植
        } else if (node instanceof globalThis.CharacterData) {
            return CharacterData;
        } else if (node instanceof globalThis.Node) {
            console.error(node);
            return Node;
        }
        return Node;
    }
    function getNormalStyle(node: globalThis.HTMLElement): BMLCSS2Properties {
        return new BMLCSS2Properties(window.getComputedStyle(node), node.style);
    }
    function getFocusStyle(node: globalThis.HTMLElement): BMLCSS2Properties {
        console.error("focusStyle is not implemented");
        return new BMLCSS2Properties(window.getComputedStyle(node), node.style);
    }
    function getActiveStyle(node: globalThis.HTMLElement): BMLCSS2Properties {
        console.error("activeStyle is not implemented");
        return new BMLCSS2Properties(window.getComputedStyle(node), node.style);
    }

    export function isFocusable(elem: globalThis.Element) {
        if (elem instanceof globalThis.HTMLInputElement) {
            if (elem.disabled) {
                return false;
            }
        }
        const style = window.getComputedStyle(elem);
        if (style.visibility === "hidden") {
            return false;
        }
        return true;
    }

    function focus(node: HTMLElement, ownerDocument: BMLDocument, eventQueue: EventQueue) {
        const prevFocus = ownerDocument.currentFocus;
        if (prevFocus === node) {
            return;
        }
        if (!isFocusable(node["node"])) {
            return;
        }
        ownerDocument._currentFocus = node;
        if (prevFocus != null) {
            eventQueue.queueSyncEvent({ type: "blur", target: prevFocus["node"] });
        }
        eventQueue.queueSyncEvent({ type: "focus", target: node["node"] });
    }
    function blur(node: HTMLElement, ownerDocument: BMLDocument, eventQueue: EventQueue) {
        console.error("blur: not implmeneted");
    }
    // impl
    export class Node {
        protected node: globalThis.Node;
        protected ownerDocument: BMLDocument;
        constructor(node: globalThis.Node, ownerDocument: BMLDocument) {
            this.node = node;
            this.ownerDocument = ownerDocument;
        }
        public get parentNode(): Node | null {
            return wrapNode(this.node.parentNode, this.ownerDocument);
        }
        public get firstChild(): Node | null {
            return wrapNode(this.node.firstChild, this.ownerDocument);
        }
        public get lastChild(): Node | null {
            return wrapNode(this.node.lastChild, this.ownerDocument);
        }
        public get previousSibling(): Node | null {
            return wrapNode(this.node.previousSibling, this.ownerDocument);
        }
        get nextSibling(): Node | null {
            return wrapNode(this.node.nextSibling, this.ownerDocument);
        }
    }

    // impl
    export class CharacterData extends Node {
        protected node: globalThis.CharacterData;
        constructor(node: globalThis.CharacterData, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get data(): string {
            return this.node.data;
        }
        public set data(value: string) {
            this.node.data = value;
        }
        public get length(): number {
            return this.node.length;
        }
    }

    // impl
    export class Text extends CharacterData {

    }

    // impl
    export class CDATASection extends Text {

    }

    // impl
    export class Document extends Node {
        protected node: globalThis.Document;
        protected _implementation: DOMImplementation;
        constructor(node: globalThis.Document, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
            this._implementation = new DOMImplementation();
        }
        public get implementation(): DOMImplementation {
            return this._implementation;
        }
        public get documentElement(): HTMLElement {
            return wrapNodeNonNull(this.node.documentElement, this.ownerDocument) as HTMLElement;
        }
    }


    // impl
    export abstract class HTMLDocument extends Document {
        protected node: globalThis.HTMLDocument;
        constructor(node: globalThis.HTMLDocument, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public getElementById(id: string | null | undefined): HTMLElement | null {
            const stringId = String(id);
            if (stringId === "") {
                return null;
            }
            return wrapNode(this.node.querySelector("#" + CSS.escape(stringId)), this.ownerDocument) as (HTMLElement | null);
        }
    }

    // impl
    export class BMLDocument extends HTMLDocument {
        _currentFocus: HTMLElement | null = null;
        _currentEvent: BMLEvent | null = null;
        public interpreter: Interpreter;
        public eventQueue: EventQueue;
        public resources: Resources;
        public browserEventTarget: BMLBrowserEventTarget;
        public constructor(node: globalThis.HTMLElement, interpreter: Interpreter, eventQueue: EventQueue, resources: Resources, browserEventTarget: BMLBrowserEventTarget) {
            super(node as any, null!); // !
            this.ownerDocument = this; // !!
            this.interpreter = interpreter;
            this.eventQueue = eventQueue;
            this.resources = resources;
            this.browserEventTarget = browserEventTarget;
        }

        public get documentElement(): HTMLElement {
            return wrapNodeNonNull(this.node, this.ownerDocument) as HTMLElement;
        }
        public get currentFocus(): HTMLElement | null {
            return this._currentFocus;
        }
        public get currentEvent(): BMLEvent | null {
            return this._currentEvent;
        }
    }

    // impl
    export class Element extends Node {
        protected node: globalThis.Element;
        constructor(node: globalThis.Element, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get tagName(): string {
            return this.node.tagName;
        }
    }

    // impl
    export class HTMLElement extends Element {
        protected node: globalThis.HTMLElement;
        constructor(node: globalThis.HTMLElement, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get id(): string {
            return this.node.id;
        }
        public get className(): string {
            return this.node.className;
        }
    }

    // impl
    export class HTMLBRElement extends HTMLElement {

    }

    // impl
    export class BMLBRElement extends HTMLBRElement {
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
    }

    // impl
    export class HTMLHtmlElement extends HTMLElement {

    }

    // impl
    export class BMLBmlElement extends HTMLHtmlElement {

    }

    // impl
    export class HTMLAnchorElement extends HTMLElement {
        protected node: globalThis.HTMLAnchorElement;
        constructor(node: globalThis.HTMLAnchorElement, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get accessKey(): string {
            return this.node.accessKey;
        }
        public get href(): string {
            return this.node.href;
        }
        public set href(value: string) {
            this.node.href = value;
        }
    }

    // impl
    export class BMLAnchorElement extends HTMLAnchorElement {
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
        public get focusStyle(): BMLCSS2Properties {
            return getFocusStyle(this.node);
        }
        public get activeStyle(): BMLCSS2Properties {
            return getActiveStyle(this.node);
        }
    }

    // impl
    export class HTMLInputElement extends HTMLElement {
        protected node: globalThis.HTMLInputElement;
        constructor(node: globalThis.HTMLInputElement, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get defaultValue(): string {
            return this.node.defaultValue;
        }
        public get accessKey(): string {
            return this.node.accessKey;
        }
        public get disabled(): boolean {
            return this.node.disabled;
        }
        public set disabled(value: boolean) {
            this.node.disabled = value;
        }
        public get maxLength(): number {
            return this.node.maxLength;
        }
        public get readOnly(): boolean {
            return this.node.readOnly;
        }
        public set readOnly(value: boolean) {
            this.node.readOnly = value;
        }
        public get type(): string {
            return this.node.type;
        }
        public get value(): string {
            return this.node.value;
        }
        public set value(value: string) {
            this.node.value = value;
        }
        public blur(): void {
            blur(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
        public focus(): void {
            focus(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
    }

    // impl
    export class BMLInputElement extends HTMLInputElement {
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
        public get focusStyle(): BMLCSS2Properties {
            return getFocusStyle(this.node);
        }
        public get activeStyle(): BMLCSS2Properties {
            return getActiveStyle(this.node);
        }
    }

    // STD B-24 第二分冊 (2/2) 第二編 付属2 表5-3参照
    // 画像の大きさは固定
    function fixImageSize(resolution: string, width: number, height: number, type: string): { width?: number, height?: number } {
        type = type.toLowerCase();
        // 表5-4参照
        //const scaleNumerator = [256, 192, 160, 128, 96, 80, 64, 48, 32];
        //const scaleDenominator = 128;
        const is720x480 = resolution.trim() === "720x480";
        if (type === "image/jpeg") {
            if (is720x480) {
                if (width % 2 != 0) {
                    return { width: width - 1, height };
                }
                return { width, height };
            }
            if (width === 960 && height === 540) {
                return { width, height };
            }
            return { width: Math.floor(width / 2), height: Math.floor(height / 2) };
        } else if (type === "image/x-arib-png" || type === "image/x-arib-mng") {
            return { width, height };
        }
        return {};
    }
    // impl
    export class HTMLObjectElement extends HTMLElement {
        protected node: globalThis.HTMLObjectElement;
        constructor(node: globalThis.HTMLObjectElement, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get data(): string {
            return this.node.data;
        }
        public set data(value: string) {
            this.node.data = value;
        }
        public get type(): string {
            return this.node.type;
        }
    }

    // impl
    export class BMLObjectElement extends HTMLObjectElement {
        public get data(): string {
            const aribData = this.node.getAttribute("arib-data");
            if (aribData == null || aribData == "") {
                return this.node.getAttribute("data") ?? "";
            }
            return aribData;
        }
        private __version: number = 0;
        protected animation: Animation | undefined;
        protected effect: KeyframeEffect | undefined;
        protected delete() {
            if (this.animation != null) {
                this.animation.cancel();
                this.effect = undefined;
                this.animation = undefined;
            }
            // Chromeではdataが未設定でtypeが設定されている場合枠線が表示されてしまうためtypeも消す
            this.node.removeAttribute("type");
            this.node.removeAttribute("data");
        }

        protected updateAnimation() {
            if (this.animation == null) {
                return;
            }
            const streamStatus = this.node.getAttribute("streamstatus");
            if (streamStatus === "play") {
                this.animation.play();
            } else if (streamStatus === "pause") {
                this.animation.pause();
            } else if (streamStatus === "stop") {
                this.animation.cancel();
            }
        }

        public set data(value: string) {
            (async () => {
                if (value == null) {
                    this.delete();
                    this.node.removeAttribute("arib-data");
                    return;
                }
                const aribType = this.node.getAttribute("arib-type");
                this.node.setAttribute("arib-data", value);
                if (value == "") {
                    this.delete();
                    return;
                }
                // 順序が逆転するのを防止
                this.__version = this.__version + 1;
                const version: number = (this as any).__version;
                const fetched = await this.ownerDocument.resources.fetchResourceAsync(value);
                if (this.__version !== version) {
                    return;
                }
                if (!fetched) {
                    this.delete();
                    return;
                }

                let imageUrl: string | undefined;
                const isPNG = aribType?.toLowerCase() === "image/x-arib-png";
                const isMNG = aribType?.toLowerCase() === "image/x-arib-mng";
                let imageType: string | undefined;
                if (isPNG || isMNG) {
                    const clutCss = window.getComputedStyle(this.node).getPropertyValue("--clut");
                    const clutUrl = clutCss == null ? null : parseCSSValue(clutCss);
                    const fetchedClut = clutUrl == null ? null : (await this.ownerDocument.resources.fetchResourceAsync(clutUrl))?.data;
                    if (this.__version !== version) {
                        return;
                    }
                    if (isMNG) {
                        const clut = fetchedClut == null ? defaultCLUT : readCLUT(Buffer.from(fetchedClut?.buffer));
                        const keyframes = aribMNGToCSSAnimation(Buffer.from(fetched.data), clut);
                        this.node.removeAttribute("data");
                        if (this.animation != null) {
                            this.animation.cancel();
                            this.animation = undefined;
                            this.effect = undefined;
                        }
                        if (keyframes == null) {
                            return;
                        }
                        this.effect = new KeyframeEffect(this.node, keyframes.keyframes, keyframes.options);
                        this.animation = new Animation(this.effect);
                        for (const blob of keyframes.blobs) {
                            fetched.blobUrl.set(blob, blob);
                        }
                        const { width, height } = fixImageSize(window.getComputedStyle((bmlNodeToNode(this.ownerDocument.documentElement) as globalThis.HTMLElement).querySelector("body")!).getPropertyValue("resolution"), keyframes.width, keyframes.height, (aribType ?? this.type));
                        if (width != null && height != null) {
                            this.node.style.maxWidth = width + "px";
                            this.node.style.minWidth = width + "px";
                            this.node.style.maxHeight = height + "px";
                            this.node.style.minHeight = height + "px";
                        }
                        // streamloopingは1固定で運用されるため考慮しない
                        // streamstatus=playのときstreampositionで指定されたフレームから再生開始
                        // streamstatus=stopのとき非表示 streampositionは0にリセットされる
                        // streamstatus=pauseのとき streampositionで指定されたフレームを表示
                        if (this.streamStatus !== "stop") {
                            console.error("unexpected streamStatus", this.streamStatus, this.data);
                        }
                        this.updateAnimation();
                        return;
                    } else {
                        imageUrl = fetched.blobUrl.get(fetchedClut);
                        if (imageUrl == null) {
                            const clut = fetchedClut == null ? defaultCLUT : readCLUT(Buffer.from(fetchedClut?.buffer));
                            const png = aribPNGToPNG(Buffer.from(fetched.data), clut);
                            const blob = new Blob([png], { type: "image/png" });
                            imageUrl = URL.createObjectURL(blob);
                            fetched.blobUrl.set(fetchedClut, imageUrl);
                        }
                        imageType = "image/png";
                    }
                } else if (aribType?.toLowerCase() === "image/jpeg") {
                    imageUrl = fetched.blobUrl.get("BT.709");
                    if (imageUrl == null) {
                        imageUrl = await convertJPEG(this.ownerDocument.resources.getCachedFileBlobUrl(fetched));
                        if (this.__version !== version) {
                            return;
                        }
                        fetched.blobUrl.set("BT.709", imageUrl);
                    }
                    imageType = "image/jpeg";
                } else {
                    this.delete();
                    return;
                }
                if (imageUrl == null) {
                    this.delete();
                    return;
                }
                // jpeg/png程度ならバイナリ解析すればImage使わずとも大きさは取得できそう
                const img = new Image();
                const imageType2 = imageType;
                img.onload = () => {
                    if (this.__version !== version) {
                        return;
                    }
                    const { width, height } = fixImageSize(window.getComputedStyle((bmlNodeToNode(this.ownerDocument.documentElement) as globalThis.HTMLElement).querySelector("body")!).getPropertyValue("--resolution"), img.width, img.height, (aribType ?? this.type));
                    if (width != null && height != null) {
                        this.node.style.maxWidth = width + "px";
                        this.node.style.minWidth = width + "px";
                        this.node.style.maxHeight = height + "px";
                        this.node.style.minHeight = height + "px";
                    }
                    this.node.type = imageType2;
                    this.node.data = img.src;
                };
                img.src = imageUrl;
            })();
        }
        public get type() {
            const aribType = this.node.getAttribute("arib-type");
            if (aribType != null) {
                return aribType;
            }
            return this.node.type;
        }
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
        public get focusStyle(): BMLCSS2Properties {
            return getFocusStyle(this.node);
        }
        public get activeStyle(): BMLCSS2Properties {
            return getActiveStyle(this.node);
        }
        public get accessKey(): string {
            return this.node.accessKey;
        }
        // 同じidであれば遷移時にも状態を保持する
        public get remain(): boolean {
            return this.node.getAttribute("remain") === "remain";
        }
        public set remain(value: boolean) {
            if (value) {
                this.node.setAttribute("remain", "remain");
            } else {
                this.node.removeAttribute("remain");
            }
        }

        // MNG
        // streamstatus=playのときstreamPositionは運用しない
        // streamstatus=stopのときstreamPositionは0
        // streamstatus=pauseのとき現在表示設定されているフレームの番号
        public get streamPosition(): number {
            const v = Number.parseInt(this.node.getAttribute("streamposition") ?? "0");
            if (Number.isFinite(v)) {
                return v;
            } else {
                return 0;
            }
        }

        // MNG
        // streamstatus=playのときstreamPositionは運用しない
        // streamstatus=stopのときstreamPositionは0以外を設定しても無視される
        // streamstatus=pauseのとき指定されたフレームを表示 フレーム数より大きければ受信機依存
        public set streamPosition(value: number) {
            if (this.streamStatus === "pause") {
                value = Number(value);
                if (Number.isFinite(value)) {
                    this.node.setAttribute("streamposition", value.toString());
                    if (this.effect != null) {
                        const timing = this.effect.getTiming();
                        const duration = Number(timing.duration);
                        const keyframes = this.effect.getKeyframes();
                        const keyframe = keyframes[Math.max(0, Math.min(value, keyframes.length - 1))];
                        timing.delay = -(keyframe.computedOffset * duration);
                        this.effect.updateTiming(timing);
                    }
                }
            } else {
                if (this.effect != null) {
                    const timing = this.effect.getTiming();
                    timing.delay = 0;
                    this.effect.updateTiming(timing);
                }
                this.node.setAttribute("streamposition", "0");
            }
        }

        static offsetToFrame(keyframes: ComputedKeyframe[], offset: number): number {
            // offset順でソートされていると仮定
            for (let i = 0; i < keyframes.length; i++) {
                if (keyframes[i].computedOffset <= offset) {
                    return i;
                }
            }
            return 0;
        }

        public get streamStatus(): DOMString {
            if (this.animation != null) {
                if (this.animation.playState === "finished" && this.streamStatus !== "pause") {
                    this.streamStatus = "pause";
                }
            }
            const value = this.node.getAttribute("streamstatus");
            if (value == null) {
                const type = this.type.toLowerCase();
                // stopを取りうる場合初期値はstop (STD-B24 第二分冊 (2/2) 付属2 4.8.5.2 注2)
                if (type === "audio/x-arib-mpeg2-aac" || type === "audio/x-arib-aiff" || type === "image/gif" || type === "image/x-arib-mng") {
                    return "stop";
                }
                return "play";
            }
            return value; // "stop" | "play" | "pause"
        }

        private audioBufferSourceNode?: AudioBufferSourceNode;
        // STD-B24 第二分冊 (2/2) 付属2 4.8.5.3
        // MNG
        // stop以外の時にdataを変更できない
        // 再生が終了したときはpauseに設定される
        public set streamStatus(value: DOMString) {
            const type = this.type.toLowerCase();
            if (type === "audio/x-arib-aiff") {
                if (value === "play") {
                    this.audioBufferSourceNode?.stop();
                    this.ownerDocument.resources.fetchResourceAsync(this.data).then(x => {
                        const data = x?.data;
                        if (data == null) {
                            return;
                        }
                        this.audioBufferSourceNode = playAIFF(new AudioContext(), Buffer.from(data)) ?? undefined;
                        this.node.setAttribute("streamstatus", "play");
                        if (this.audioBufferSourceNode != null) {
                            const sourceNode = this.audioBufferSourceNode;
                            sourceNode.onended = () => {
                                if (sourceNode === this.audioBufferSourceNode) {
                                    this.node.setAttribute("streamstatus", "stop");
                                }
                            };
                        }
                    });
                } else if (value === "stop") {
                    this.audioBufferSourceNode?.stop();
                    this.audioBufferSourceNode = undefined;
                    this.node.setAttribute("streamstatus", "stop");
                }
                return;
            }
            if (this.animation == null || this.effect == null) {
                this.node.setAttribute("streamstatus", value);
                return;
            }
            if (this.streamStatus === value) {
                return;
            }
            const prevStatus = this.streamStatus;
            if (value === "play") {
                this.node.setAttribute("streamstatus", "play");
                if (prevStatus === "pause") {
                    // pause=>play streampositionに設定されているフレームから再生開始
                    this.animation.play();
                } else if (prevStatus === "stop") {
                    // stop=>play 0フレームから再生開始
                    this.streamPosition = 0;
                    this.animation.play();
                }
            } else if (value === "pause") {
                this.node.setAttribute("streamstatus", "pause");
                if (prevStatus === "play") {
                    // play=>pause どのフレームを表示するかは受信機依存 streampositionはそのフレームに設定される 繰り返し回数はリセット
                    this.animation.pause();
                    const duration = Number(this.effect.getTiming().duration);
                    this.streamPosition = BMLObjectElement.offsetToFrame(this.effect.getKeyframes(), ((this.animation.currentTime! - this.animation.startTime!) % duration) / duration);
                } else if (prevStatus === "stop") {
                    // stop=>pause 0フレーム目が表示される
                    this.streamPosition = 0;
                    this.animation.play();
                    this.animation.pause();
                }
            } else if (value === "stop") {
                // play=>stop streampositionは0 繰り返し回数はリセット
                // pause=>stop play=>pauseのときと同様
                this.animation.cancel();
                this.streamPosition = 0;
                this.node.setAttribute("streamstatus", "stop");
            }
        }

        public setMainAudioStream(audio_ref: DOMString): boolean {
            throw new Error("BMLObjectElement.setMainAudioStream()");
        }
        public getMainAudioStream(): DOMString {
            throw new Error("BMLObjectElement.getMainAudioStream()");
        }
        public blur(): void {
            blur(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
        public focus(): void {
            focus(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
    }

    // impl
    export class BMLSpanElement extends HTMLElement {
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
        public get focusStyle(): BMLCSS2Properties {
            return getFocusStyle(this.node);
        }
        public get activeStyle(): BMLCSS2Properties {
            return getActiveStyle(this.node);
        }
        public get accessKey(): string {
            return this.node.accessKey;
        }
        public blur(): void {
            blur(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
        public focus(): void {
            focus(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
    }

    // impl
    export class HTMLBodyElement extends HTMLElement {

    }

    // impl
    export class BMLBodyElement extends HTMLBodyElement {
        public get invisible(): boolean {
            return this.node.getAttribute("invisible") === "invisible";
        }
        public set invisible(v: boolean) {
            if (v) {
                this.node.setAttribute("invisible", "invisible");
            } else {
                this.node.removeAttribute("invisible");
            }
            this.ownerDocument.browserEventTarget.dispatchEvent<"invisible">(new CustomEvent("invisible", { detail: v }));
        }
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
    }

    // impl
    export class HTMLDivElement extends HTMLElement {

    }

    // impl
    export class BMLDivElement extends HTMLDivElement {
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
        public get focusStyle(): BMLCSS2Properties {
            return getFocusStyle(this.node);
        }
        public get activeStyle(): BMLCSS2Properties {
            return getActiveStyle(this.node);
        }
        public get accessKey(): string {
            return this.node.accessKey;
        }
        public blur(): void {
            blur(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
        public focus(): void {
            focus(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
    }

    // impl
    export class HTMLParagraphElement extends HTMLElement {

    }

    // impl
    export class BMLParagraphElement extends HTMLParagraphElement {
        public get normalStyle(): BMLCSS2Properties {
            return getNormalStyle(this.node);
        }
        public get focusStyle(): BMLCSS2Properties {
            return getFocusStyle(this.node);
        }
        public get activeStyle(): BMLCSS2Properties {
            return getActiveStyle(this.node);
        }
        public get accessKey(): string {
            return this.node.accessKey;
        }
        public blur(): void {
            blur(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
        public focus(): void {
            focus(this, this.ownerDocument, this.ownerDocument.eventQueue);
        }
    }

    // impl
    export class HTMLMetaElement extends HTMLElement {
        protected node: globalThis.HTMLMetaElement;
        constructor(node: globalThis.HTMLMetaElement, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get content(): string {
            return this.node.content;
        }
        public get name(): string {
            return this.node.name;
        }
    }

    // impl
    export class HTMLTitleElement extends HTMLElement {
        protected node: globalThis.HTMLTitleElement;
        constructor(node: globalThis.HTMLTitleElement, ownerDocument: BMLDocument) {
            super(node, ownerDocument);
            this.node = node;
        }
        public get text(): string {
            return this.node.text;
        }
    }

    // impl
    export class HTMLScriptElement extends HTMLElement {

    }

    // impl
    export class HTMLStyleElement extends HTMLElement {

    }

    // impl
    export class HTMLHeadElement extends HTMLElement {

    }

    // impl
    export class BMLBeventElement extends HTMLElement {
    }

    function attrToNumber(attr: string | null): number | null {
        const n = Number.parseInt(attr ?? "");
        if (Number.isNaN(n)) {
            return null;
        }
        return n;
    }

    // impl
    export class BMLBeitemElement extends HTMLElement {
        public get type(): DOMString {
            return this.node.getAttribute("type") ?? "";
        }
        public get esRef(): DOMString {
            return this.node.getAttribute("es_ref") ?? "";
        }
        public set esRef(value: DOMString) {
            this.node.setAttribute("es_ref", value);
        }
        public get messageId(): number {
            return attrToNumber(this.node.getAttribute("message_id")) ?? 0;
        }
        public set messageId(value: number) {
            this.node.setAttribute("message_id", String(value));
        }
        public get messageVersion(): number {
            return attrToNumber(this.node.getAttribute("message_version")) ?? 0;
        }
        public set messageVersion(value: number) {
            this.node.setAttribute("message_version", String(value));
        }
        public get messageGroupId(): number {
            return attrToNumber(this.node.getAttribute("message_group_id")) ?? 0;
        }
        // public set messageGroupId(value: number) {
        //     this.node.setAttribute("message_group_id", String(value));
        // }
        public get moduleRef(): DOMString {
            return this.node.getAttribute("module_ref") ?? "";
        }
        public set moduleRef(value: DOMString) {
            this.node.setAttribute("module_ref", value);
        }
        public get languageTag(): number {
            return attrToNumber(this.node.getAttribute("language_tag")) ?? 0;
        }
        public set languageTag(value: number) {
            this.node.setAttribute("language_tag", String(value));
        }
        /*
        public get registerId(): number {
            return attrToNumber(this.node.getAttribute("register_id")) ?? 0;
        }
        public set registerId(value: number) {
            this.node.setAttribute("register_id", String(value));
        }
        public get serviceId(): number {
            return attrToNumber(this.node.getAttribute("service_id")) ?? 0;
        }
        public set serviceId(value: number) {
            this.node.setAttribute("service_id", String(value));
        }
        public get eventId(): number {
            return attrToNumber(this.node.getAttribute("event_id")) ?? 0;
        }
        public set eventId(value: number) {
            this.node.setAttribute("event_id", String(value));
        }*/
        public get peripheralRef(): DOMString {
            return this.node.getAttribute("peripheral_ref") ?? "";
        }
        public set peripheralRef(value: DOMString) {
            this.node.setAttribute("peripheral_ref", value);
        }
        public get timeMode() {
            return this.node.getAttribute("time_mode") ?? "";
        }
        // public set timeMode(value: DOMString) {
        //     this.node.setAttribute("time_mode", value);
        // }
        public get timeValue() {
            return this.node.getAttribute("time_value") ?? "";
        }
        public set timeValue(value: DOMString) {
            this.node.setAttribute("time_value", value);
        }
        public get objectId() {
            return this.node.getAttribute("object_id") ?? "";
        }
        public set objectId(value: DOMString) {
            this.node.setAttribute("object_id", value);
        }
        public get segmentId(): DOMString {
            return this.node.getAttribute("segment_id") ?? "";
        }
        public set segmentId(value: DOMString) {
            this.node.setAttribute("segment_id", value);
        }
        public get subscribe(): boolean {
            return this.node.getAttribute("subscribe") === "subscribe";
        }
        public set subscribe(value: boolean) {
            if (value) {
                this.node.setAttribute("subscribe", "subscribe");
            } else {
                this.node.removeAttribute("subscribe");
            }
        }
    }

    interface BMLEventData {
        type: string;
        target: HTMLElement | null;
    }


    interface BMLIntrinsicEventData extends BMLEventData {
        keyCode: number;
    }

    interface BMLBeventEventData extends BMLEventData {
        status: number;
        privateData: string;
        esRef: string;
        messageId: number;
        messageVersion: number;
        messageGroupId: number;
        moduleRef: string;
        languageTag: number;
        registerId: number;
        serviceId: number;
        eventId: number;
        peripheralRef: string;
        object: BMLObjectElement | null;
        segmentId: string | null;
    }

    // impl
    export class BMLEvent {
        protected _data: BMLEventData;
        constructor(data: BMLEventData) {
            this._data = { ...data };
        }
        public get type(): DOMString { return this._data.type; }
        public get target(): HTMLElement | null { return this._data.target; }
    }

    // impl
    export class BMLIntrinsicEvent extends BMLEvent {
        protected _keyCode: number;
        constructor(data: BMLIntrinsicEventData) {
            super(data);
            this._keyCode = data.keyCode;
        }
        public get keyCode(): number { return this._keyCode; }
    }

    // impl
    export class BMLBeventEvent extends BMLEvent {
        protected _data: BMLBeventEventData;
        constructor(data: BMLBeventEventData) {
            super(data);
            this._data = data;
        }
        public get status(): number { return this._data.status; }
        public get privateData(): string { return this._data.privateData; }
        public get esRef(): string { return this._data.esRef; }
        public get messageId(): number { return this._data.messageId; }
        public get messageVersion(): number { return this._data.messageVersion; }
        public get messageGroupId(): number { return this._data.messageGroupId; }
        public get moduleRef(): string { return this._data.moduleRef; }
        public get languageTag(): number { return this._data.languageTag; }
        // public get registerId(): number { return this.registerId; }
        // public get serviceId(): string { return this.serviceId; }
        // public get eventId(): string { return this.eventId; }
        public get peripheralRef(): string { return this.peripheralRef; }
        public get object(): BMLObjectElement | null { return this._data.object; }
        public get segmentId(): string | null { return this._data.segmentId; }
    }

    // impl
    export class DOMImplementation {
        public hasFeature(feature: string, version: string) {
            return feature.toUpperCase() === "BML" && version === "1.0";
        }
    }
}
