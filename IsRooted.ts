import { useEffect } from "react";
import * as Device from 'expo-device';

export function IsRooted(state: AppState, setState: React.Dispatch<React.SetStateAction<AppState>>) {
    useEffect(() => {
        (async () => {
          try {
            const rooted = await Device.isRootedExperimentalAsync();
            state.rooted = rooted;
            setState(state);
          } catch (error: unknown) {
            if (error instanceof Error) {
              state.error = error.message;
            }
            else {
              state.error = "Unknown error!";
            }
            setState(state);
          }
        })();
      }, []);
}