import Tictacto from "~/components/minigames/tictacto";
import { MinigamesProvider } from "~/context/minigames/MinigamesContext";

const Minigames = () => {
    return (
        <MinigamesProvider levels={[<Tictacto />]} />
    );
}

export default Minigames;