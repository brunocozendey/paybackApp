import { isTemplateElement } from '@babel/types';
import React, { Component } from 'react'

export default class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handlePaybackChange = this.handlePaybackChange.bind(this);
    this.handleDividaChange = this.handleDividaChange.bind(this);
    this.handleContribuicaoChange = this.handleContribuicaoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calculaPerdao(paybackTotal){
    var paybackList = [[1,0.7],[1,0.5],[0.7,0.5], [0.5, 0], [0.5, 0], [0.25, 0], [0.25, 0], [0.25, 0],[0, 0]];
    if (paybackTotal>=10){
      return paybackList[8]
    }
    for (var i = 2; i < 10; i++){
      if (paybackTotal<=i)
      {
        return paybackList[i-2]
      }
      
    }
  }

  handlePaybackChange(event) {
    this.setState({payback: event.target.value});
  }

  handleDividaChange(event) {
    this.setState({divida: event.target.value});
  }

  handleContribuicaoChange(event) {
    this.setState({contribuicao: event.target.value});
  }

  handleSubmit(event) {
    var paybackFloat = (parseFloat(this.state.payback));
    var dividaFloat = (parseFloat(this.state.divida));
    var contribuicaoFloat = (parseFloat(this.state.contribuicao));
    var paybackTotal = (paybackFloat + (dividaFloat /contribuicaoFloat )).toFixed(2);

    var percentuais = this.calculaPerdao(paybackTotal);
    var percentual_contrato = percentuais[0];
    var percentual_sem_contrato = percentuais[1];
    
    var valor_perdoado_contrato = (dividaFloat*percentual_contrato).toFixed(2);
    var valor_perdoado_sem_contrato = (dividaFloat*percentual_sem_contrato).toFixed(2);

    //alert('Payback: ' + this.state.payback + '\n Divida: '+ this.state.divida + '\n Contribuição: '+ this.state.contribuicao+'\n Payback Total: '+ paybackTotal) ;
    alert('O Payback total é de '+paybackTotal+'\nO valor perdoado COM contrato é de ' + valor_perdoado_contrato + ' referente a ' +percentual_contrato*100 +'%'+'\nO valor perdoado SEM contrato é de '+valor_perdoado_sem_contrato+' referente a '+percentual_sem_contrato*100+'%')
      //var payback
      //var divida
      //var contribuicao
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1> Cálculo Payback stone </h1>
        <label>
            <p>Payback:
            <input type="text" value={this.state.payback} onChange={this.handlePaybackChange} />
          </p>
          <p>
            Divida:
            <input type="text" value={this.state.divida} onChange={this.handleDividaChange} />
          </p>
          <p>
            Contribuição:
            <input type="text" value={this.state.contribuicao} onChange={this.handleContribuicaoChange} />
          </p>
        </label>
        <p>
        <input type="submit" value="Calcular Payback" />
        </p>
      </form>
    );
  }
}