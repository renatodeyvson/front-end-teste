import React, { Component } from 'react';
import api from '../services/api';
import './main.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: '',
            price: 0,
            brand: '',
            photo: '',
            startDate: '',
            endDate: '',
            color: '',
            code: '',
            phones: []
        };

        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleSubmitPhoneForm = this.handleSubmitPhoneForm.bind(this);
    }

    handleBrandChange(event) {
        this.setState({ brand: event.target.value });
    }
    handleModelChange(event) {
        this.setState({ model: event.target.value });
    }
    handlePriceChange(event) {
        this.setState({ price: event.target.value });
    }
    handlePhotoChange(event) {
        this.setState({ photo: event.target.value });
    }
    handleStartDateChange(event) {
        this.setState({ startDate: event.target.value });
    }
    handleEndDateChange(event) {
        this.setState({ endDate: event.target.value });
    }
    handleColorChange(event) {
        this.setState({ color: event.target.value });
    }
    handleCodeChange(event) {
        this.setState({ code: event.target.value });
    }

    async handleSubmitPhoneForm(event) {
        const { model,
            price,
            brand,
            photo,
            startDate,
            endDate,
            color,
            code
          } = this.state;

        
        try{
            const postedPhone = await api.post('/phones', { model, price, brand, photo, startDate, endDate, color, code });
            
            console.log(postedPhone);

            this.setState({ phoneForm: {} });
            this.loadPhones();
        } catch(err) {
            console.error(err);
        }
    }

    deletePhone = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esse item?')){
            await api.delete(`/phones/${id}`);
        }

        this.loadPhones();
    };

    componentDidMount(){
        this.loadPhones();
    }

    loadPhones = async () => {
        try{
            const response = await api.get('/phones');

            this.setState({ phones: response.data.docs });
        } catch(err) {
            console.error(err);
        }
    }

    render(){
        let { phones } = this.state;
        phones.reverse();

        return (
            <div className="main">

                <div className="phone-form">
                    <div id="phone-form-box">
                        <label>
                            Marca: <input className="input-bar" type="text" value={this.state.brand} onChange={this.handleBrandChange} /><br/>
                            Modelo: <input className="input-bar" type="text" value={this.state.model} onChange={this.handleModelChange} /><br/>
                            Preço: <input className="input-bar" type="number" value={this.state.price} onChange={this.handlePriceChange} step="any" /><br/>
                            URL da Foto: <input className="input-bar" type="text" value={this.state.photo} onChange={this.handlePhotoChange} /><br/>
                            Início da venda: <input className="input-bar" type="text" placeholder="dd/MM/aaaa" value={this.state.startDate} onChange={this.handleStartDateChange} /><br/>
                            Fim da venda: <input className="input-bar" type="text" placeholder="dd/MM/aaaa" value={this.state.endDate} onChange={this.handleEndDateChange} /><br/>
                                <div>
                                Color: <input type="radio" value="BLACK" checked={this.state.color === 'BLACK'} onChange={this.handleColorChange} />BLACK 
                                    <input type="radio" value="WHITE" checked={this.state.color === 'WHITE'} onChange={this.handleColorChange} />WHITE 
                                    <input type="radio" value="GOLD" checked={this.state.color === 'GOLD'} onChange={this.handleColorChange} />GOLD 
                                    <input type="radio" value="PINK" checked={this.state.color === 'PINK'} onChange={this.handleColorChange} />PINK 
                                </div>
                            Código:<input className="input-bar" type="text" value={this.state.code} onChange={this.handleCodeChange} /><br/>
                        </label>
                        <button onClick={this.handleSubmitPhoneForm}>ADICIONAR</button>
                    </div>
                </div>

                <div className="phone-list">
                    {phones.map(phone => (
                        <article key={phone._id}>
                            <img src={phone.photo} alt={phone.brand+' '+phone.model}></img><br />
                            <strong>{phone.brand+' '+phone.model}</strong><br />
                            <strong className="price">R${phone.price}</strong>
                            <p>Modelo: {phone.model}, Marca: {phone.brand}, Cor: {phone.color}, Código: {phone.code}, Data de início da venda: {phone.startDate}, Data de fim da venda: {phone.endDate}</p>
                            <button onClick={() => this.deletePhone(phone._id)}>EXCLUIR</button>
                        </article>
                    ))}
                </div>
            </div>
        );
    }
}