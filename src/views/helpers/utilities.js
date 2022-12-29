import { useMatrixClient } from "@/stores/MatrixClient";

let client = useMatrixClient();


setInterval(({groups, seconds}) => {
  Object.assign(groups, client.getGroups())
}, 10000)

