import Clicker from "~/components/minigames/clicker";
import Snake from "~/components/minigames/snake";
import Tictacto from "~/components/minigames/tictacto";
import { MinigamesProvider } from "~/context/minigames/MinigamesContext";

const Capcha = () => {
    return (
        <MinigamesProvider levels={[<Snake />, <Clicker />, <Tictacto />]} />
    );
}

export default Capcha;