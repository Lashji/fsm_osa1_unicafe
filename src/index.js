import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hyva : 0,
            neutraali : 0,
            huono: 0,
            keskiarvo: 0,
            positiivisia: 0
        }
    }


    arvio = (arvio) => {

        const {keskiarvo, positiivisia} = this.laskeStatistiikat()
        console.log(keskiarvo, positiivisia)
        switch(arvio){
            case 'hyvä': 
                return () => {
                    this.setState({
                        hyva: this.state.hyva + 1,
                        keskiarvo: keskiarvo,
                        positiivisia: positiivisia
                    });
                
            }

            case 'neutraali':
                return () => {

                    this.setState({
                        neutraali: this.state.neutraali + 1,
                        keskiarvo: keskiarvo,
                        positiivisia: positiivisia
                    });
                
            }
            case 'huono':
                return () => {

                    this.setState({
                        huono: this.state.huono + 1,
                        keskiarvo: keskiarvo,
                        positiivisia: positiivisia
                    });
                
            }
            default: break

        }

    }

    laskeStatistiikat = () => {

        const stats = { 
            keskiarvo: 0,
            positiivisia: 0
        }
        let {hyva, neutraali, huono} = this.state

        if (hyva === 0 && neutraali === 0 && huono === 0){
            return stats
        }

        let summa = hyva + neutraali + huono
        stats.keskiarvo = (hyva - huono) / summa
        
        stats.positiivisia = (hyva / summa) * 100
        
        // console.log(summa, hyva, neutraali, huono, stats.keskiarvo, stats.positiivisia)
        return stats
    }


    render() {

        return (
            
            <div>
            <h1>anna palautetta</h1>
            <Buttons handler={this.arvio} />
            <Statistiikka state={this.state} />
            </div>
        )
        
    }


}



const Buttons = ({handler}) => {
    return (
        <div>
        <Button
            handler={handler("hyvä")} text={"hyvä"}
            />
        <Button
            handler={handler("neutraali")} text={"neutraali"}
            />
        <Button
            handler={handler("huono")} text={"huono"}
            />
        </div>
    )
}

const Statistiikka = ({state}) => {
    const {hyva, neutraali, huono, keskiarvo, positiivisia} = state
    
    return <div>
        <h1>Statistiikka</h1>
        <p>hyvä {hyva}</p>
        <p>neutraali {neutraali}</p>
        <p>huono {huono}</p>
        <p>keskiarvo {keskiarvo}</p>
        <p>positiivisia {positiivisia} %</p>
      </div>


}

const Button = ({handler, text}) => {
    return (
        <div>
            <button onClick={handler} >{text}</button>
        </div>
    )

}


ReactDOM.render(<App />, document.getElementById('root'));

