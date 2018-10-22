function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function process(type, obj) {
  if (Array.isArray(obj)) {
    return obj.forEach(item => process(type, item))
  }

  if (isObject(obj)) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        obj[i] = process(type, obj[i])
      }
    }

    return obj
  }

  if (typeof obj === 'string') {
    return type === 'decode' ? decodeURIComponent(obj) : encodeURIComponent(obj)
  }

  return obj
}

function encode(obj) {
  return process('encode', obj)
}

function decode(obj) {
  if (obj && obj._readableState) {
    return obj;
  }

  return process('decode', obj)
}

module.export = async (ctx, next) => {
  if (ctx.params) {
    encode(ctx.params)
  }

  if (ctx.request.body) {
    encode(ctx.request.body)
  }

  await next();

  if (ctx.body && typeof ctx.body !== 'string') {
    decode(ctx.body)
  }
};
