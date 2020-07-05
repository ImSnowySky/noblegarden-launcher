module.exports = process => listeners => Object.keys(listeners)
  .forEach(eventName => {
    process.on(
      eventName,
      async (event, ...args) => await listeners[eventName](event, ...args)
    )
  });