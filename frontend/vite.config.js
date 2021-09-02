import ReactRefresh from "@vitejs/plugin-react-refresh"

const build = {
  chunkSizeWarningLimit: 1500,
}

export default ({mode}) => {
  return {
    plugins: [ReactRefresh()],
    build,
  }
}
