import { Providers } from "../component/calculator/provider";
import { Calculator } from '../component/calculator';
export default function Calendar() {

    return (
        <main>
            <Providers>
                <Calculator />
            </Providers>
        </main>
    )
}