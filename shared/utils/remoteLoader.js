const remoteLoaderHelper = (remoteName, remoteModuleUrl) => {
  return (resolve) => {
    const path = (window.cdnUrl || '') + remoteModuleUrl + '/remoteEntry.js' + (`?v=${window.MODERN_CONFIG.HASH || Date.now()}`);
    const script = document.createElement('script');

    script.src = path
    script.onload = () => {
      const proxy = {
        get: (request) => window[remoteName].get(request),
        init: (...arg) => {
          try {
            return window[remoteName].init(...arg)
          } catch (e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }

    document.head.appendChild(script);
  }
}

const remoteLoader = (remoteName, remoteModuleUrl) => `promise new Promise((${remoteLoaderHelper})('${remoteName}','${remoteModuleUrl}'))`;

const localLoaderHelper = (remoteName, remoteModuleUrl) => {
  return (resolve) => {
    const path = remoteModuleUrl + '/remoteEntry.js' + (`?v=${window.MODERN_CONFIG.HASH || Date.now()}`);
    const script = document.createElement('script');

    script.src = path
    script.onload = () => {
      const proxy = {
        get: (request) => window[remoteName].get(request),
        init: (...arg) => {
          try {
            return window[remoteName].init(...arg)
          } catch (e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }

    document.head.appendChild(script);
  }
}

const localLoader = (remoteName, remoteModuleUrl) => `promise new Promise((${localLoaderHelper})('${remoteName}','${remoteModuleUrl}'))`;

const createLoaders = (key) => {
  return {
    remote: function (env) {
      return {
        [key]: env.WEBPACK_BUILD
          ? remoteLoader(this.name, this.path)
          : localLoader(this.name, `http://localhost:${this.port}`)
      }
    }
  }
}

module.exports = { createLoaders };
