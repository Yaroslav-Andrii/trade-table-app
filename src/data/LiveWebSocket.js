export default class LiveWebSocket {
  constructor(wsUri, wscb, protocb, opts) {
    this.start_time = 0;
    this.wsUri = wsUri;
    this.time_mult = 1;
    this.mapping = {};
    this.order = [];
    this.wscbs = wscb;
    this.protocb = protocb;
    this.opts = opts || {};
    this.wsClose = null;
  }

  start(pairs) {
    const ws = new WebSocket(this.wsUri);

    this.wsClose = () => { ws.close() };
    
    ws.onmessage = (evt) => {
      return this.process(evt.data);
    }
  
    ws.onclose = this.wscbs.onclose;
    ws.onopen = (evt) => {
      this.wscbs.onopen(evt);
      ws.send(this.pack({"pairs": pairs, "options": this.opts}))
    };
  
    ws.onerror = this.wscbs.onerror;
  }

  process(data) {
    const t = data.substring(0, 1);
    const msg = data.substring(1);
    const cb = this.protocb['on' + t]
    let inc_data = null;

    switch (t) {
    case '0':
        inc_data = this.unpackInit(msg);
        break;
    case '7':
    case '8':
    case '9':
        inc_data = this.unpackErrPair(msg);
        break;
    case '1':
        inc_data = this.unpackData(msg);
        break;
    case '2':
        inc_data = "";
        break
    default:
        break;
    }

    if(inc_data != null) {

      if(cb) {
        cb(inc_data, this.opts);
      } else {
        if(cb === null) { return } // quiet mode
        const default_cb = this.protocb['__default'];
          
        if(default_cb) {
          default_cb(inc_data);
        } else {
          this.protocb.fatal(data);
        }
      }
    } else {
      this.protocb.fatal(data);
    }
  }

  unpackErrPair(data) {
    return JSON.parse(data);
  }

  unpackInit(data) {
    const meta = JSON.parse(data);

    this.start_time = meta['start_time'];
    this.mapping = meta['mapping'];
    this.order = meta['order'];
    this.time_mult = meta['time_mult'];

    return meta;
  }

  unpackData = function(data) {
    const inc = data.split('|');
    const out = {};

    for (let i in this.order) {
      out[this.order[i]] = inc[i];
    }

    out["name"] = this.mapping[out["name"]];
    out["time"] = parseFloat(out["time"]) / this.time_mult;
    out["time"] += this.start_time;

    return out;
  }

  pack(data) {
    return JSON.stringify(data);
  }

  toString(data) {
    return JSON.stringify(data);
  }
}