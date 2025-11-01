import Tictacto from "~/components/minigames/tictacto";
import { MinigamesProvider } from "~/context/minigames/MinigamesContext";

const Capcha = () => {
    return (
        <MinigamesProvider levels={[<Tictacto />]} />
    );
}

export default Capcha;