import { InstanceContext } from './index';

export default function useToken() {
  const { token, setToken } =  React.useContext(InstanceContext);
  return {
    token,
    setToken,
  }
}
