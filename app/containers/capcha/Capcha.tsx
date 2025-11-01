import Snake from "~/components/minigames/snake";
import Tictacto from "~/components/minigames/tictacto";
import { MinigamesProvider } from "~/context/minigames/MinigamesContext";

const Capcha = () => {
    return (
        <MinigamesProvider levels={[<Snake />]} />
    );
}

export default Capcha;