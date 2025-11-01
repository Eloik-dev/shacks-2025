import Clicker from "~/components/minigames/clicker";
import Comet from "~/components/minigames/comet";
import Jeopardy from "~/components/minigames/Jeopardy/jeopardy";
import Snake from "~/components/minigames/Snake/snake";
import Tictacto from "~/components/minigames/tictacto";
import { MinigamesProvider } from "~/context/MinigamesContext";

const Capcha = () => {
    return (
        <MinigamesProvider levels={[<Comet />]} />
    );
}

export default Capcha;