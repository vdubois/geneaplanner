import ReactRefresh from "@vitejs/plugin-react"

const build = {
  chunkSizeWarningLimit: 1500,
}

export default ({mode}) => {
  return {
    plugins: [ReactRefresh()],
    build,
  }
}
