import Clicker from "~/components/minigames/clicker";
import Comet from "~/components/minigames/comet";
import Snake from "~/components/minigames/snake";
import Tictacto from "~/components/minigames/tictacto";
import { MinigamesProvider } from "~/context/minigames/MinigamesContext";

const Capcha = () => {
    return (
        <MinigamesProvider levels={[<Comet />]} />
    );
}

export default Capcha;