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
            phones: [],
            modelErrorDescription: '',
            priceErrorDescription: '',
            brandErrorDescription: '',
            photoErrorDescription: '',
            startDateErrorDescription: '',
            endDateErrorDescription: '',
            codeErrorDescription: ''
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

        const checking = this.checkBrand(event.target.value);
        if(checking.message !== 'OK') this.setState({ brandErrorDescription: checking.description });
        else this.setState({ brandErrorDescription: '' });
    }
    handleModelChange(event) {
        this.setState({ model: event.target.value });

        const checking = this.checkModel(event.target.value);
        if(checking.message !== 'OK') this.setState({ modelErrorDescription: checking.description });
        else this.setState({ modelErrorDescription: '' });
    }
    handlePriceChange(event) {
        this.setState({ price: event.target.value });

        const checking = this.checkPrice(event.target.value);
        if(checking.message !== 'OK') this.setState({ priceErrorDescription: checking.description });
        else this.setState({ priceErrorDescription: '' });
    }
    handlePhotoChange(event) {
        this.setState({ photo: event.target.value });

        const checking = this.checkPhoto(event.target.value);
        if(checking.message !== 'OK') this.setState({ photoErrorDescription: checking.description });
        else this.setState({ photoErrorDescription: '' });
    }
    handleStartDateChange(event) {
        this.setState({ startDate: event.target.value });

        const checking = this.checkStartDate(event.target.value);
        if(checking.message !== 'OK') this.setState({ startDateErrorDescription: checking.description });
        else this.setState({ startDateErrorDescription: '' });
    }
    handleEndDateChange(event) {
        this.setState({ endDate: event.target.value });

        const checking = this.checkEndDate(this.state.startDate, event.target.value);
        if(checking.message !== 'OK') this.setState({ endDateErrorDescription: checking.description });
        else this.setState({ endDateErrorDescription: '' });
    }
    handleColorChange(event) {
        this.setState({ color: event.target.value });
    }
    handleCodeChange(event) {
        this.setState({ code: event.target.value });

        const checking = this.checkCode(event.target.value);
        if(checking.message !== 'OK') this.setState({ codeErrorDescription: checking.description });
        else this.setState({ codeErrorDescription: '' });
    }

    checkBrand = (brand) => {
        brand = brand.replace(' ', '');

        if(brand.length < 2 || brand.length > 255){
            return {
                message: 'Marca inválida.',
                description: 'A marca deve ter no mínimo 2 e no máximo 255 caracteres, desprezando espaços em branco.'
            };
        }
        if(!this.alphanumeric(brand)) {
            return {
                message: 'Marca inválida.',
                description: 'Marca com caracteres inválidos.'
            };
        }

        return { message: 'OK' };
    };
    checkModel = (model) => {
        model = model.replace(' ', '');

        if(model.length < 2 || model.length > 255){
            return {
                message: 'Modelo inválido.',
                description: 'O modelo deve ter no mínimo 2 e no máximo 255 caracteres, desprezando espaços em branco.'
            };
        }
        if(!this.alphanumeric(model)) {
            return {
                message: 'Modelo inválido.',
                description: 'Modelo com caracteres inválidos.'
            };
        }

        return { message: 'OK' };
    };
    checkPrice = (price) => {
        if(price < 0){
            return {
                message: 'Preço inválido.',
                description: 'O preço deve ser um número positivo.'
            };
        }

        return { message: 'OK' };
    };
    checkPhoto = (photo) => {
        photo = photo.replace(' ', '');

        if(photo.length > 255){
            return {
                message: 'Foto inválida.',
                description: 'A foto deve ter no máximo 255 caracteres, desprezando espaços em branco.'
            };
        }

        return { message: 'OK' };
    };
    checkStartDate = (startDate) => {
        const utcStartDate = this.convertDate(startDate);

        if(!utcStartDate){
            return {
                message: 'Data de início da venda inválida.',
                description: 'A data de início da venda deve ter o formato "dd/MM/yyyy".'
            };
        }
        if(utcStartDate < this.convertDate('25/12/2018')){
            return {
                message: 'Data de início da venda inválida.',
                description: 'A data de início da venda deve ser posterior ao dia 25/12/2018.'
            };
        }

        return { message: 'OK' };
    };
    checkEndDate = (startDate, endDate) => {
        const utcStartDate = this.convertDate(startDate);
        const utcEndDate = this.convertDate(endDate);

        if(!utcEndDate){
            return {
                message: 'Data de início da venda inválida.',
                description: 'A data de início da venda deve ter o formato "dd/MM/yyyy".'
            };
        }
        if(!utcEndDate){
            return {
                message: 'Data de fim da venda inválida.',
                description: 'A data de fim da venda deve ter o formato "dd/MM/yyyy".'
            };
        }
        if(utcStartDate >= utcEndDate){
            return {
                message: 'Data de fim da venda inválida.',
                description: 'A data de fim da venda deve ser posterior a data de início.'
            };
        }

        return { message: 'OK' };
    };
    checkCode = (code) => {
        if(code.length !== 8){
            return {
                message: 'Código inválido.',
                description: 'O código deve ter 8 caracteres.'
            };
        }
        if(!this.alphanumeric(code)) {
            return {
                message: 'Código inválido.',
                description: 'Código com caracteres inválidos.'
            };
        }

        return { message: 'OK' };
    };
    checkErros = () => {
        return this.state.modelErrorDescription !== ''
            || this.state.priceErrorDescription !== ''
            || this.state.brandErrorDescription !== ''
            || this.state.photoErrorDescription !== ''
            || this.state.startDateErrorDescription !== ''
            || this.state.endDateErrorDescription !== ''
            || this.state.codeErrorDescription !== ''
            || this.state.model === ''
            || this.state.brand === ''
            || this.state.photo === ''
            || this.state.startDate === ''
            || this.state.endDate === ''
            || this.state.code === '';
    }
    alphanumeric = (input) => {
        const letterNumber = /^[0-9a-zA-Z]+$/;
        return input.match(letterNumber);
    };
    numeric = (input) => {
        var letterNumber = /^[0-9]+$/;
        return input.match(letterNumber);
    };
    convertDate = (date) => {
        if(date.length !== 10 || date.charAt(2) !== '/' || date.charAt(5) !== '/') return undefined;
    
        const day = date.substring(0, 2);
        const month = date.substring(3, 5);
        const year = date.substring(6, 10);
    
        if(!this.numeric(day) || !this.numeric(month) || !this.numeric(year)) return undefined;
    
        return new Date(year+'-'+month+'-'+day+'T00:00:00Z');
    };

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
            await api.post('/phones', { model, price, brand, photo, startDate, endDate, color, code });

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

            response.data.docs = response.data.docs.reverse();

            this.setState({ phones: response.data.docs });
        } catch(err) {
            console.error(err);
        }
    };

    render(){
        let { phones } = this.state;

        return (
            <div className="main">

                <div className="phone-form">
                    <div id="phone-form-box">
                        <label>
                            Marca: <input className="input-bar" type="text" value={this.state.brand} onChange={this.handleBrandChange} /><br/>
                            <span className="error">{this.state.brandErrorDescription}</span><br/>
                            Modelo: <input className="input-bar" type="text" value={this.state.model} onChange={this.handleModelChange} /><br/>
                            <span className="error">{this.state.modelErrorDescription}</span><br/>
                            Preço: <input className="input-bar" type="number" value={this.state.price} onChange={this.handlePriceChange} step="any" /><br/>
                            <span className="error">{this.state.priceErrorDescription}</span><br/>
                            URL da Foto: <input className="input-bar" type="text" value={this.state.photo} onChange={this.handlePhotoChange} /><br/>
                            <span className="error">{this.state.photoErrorDescription}</span><br/>
                            Início da venda: <input className="input-bar" type="text" placeholder="dd/MM/aaaa" value={this.state.startDate} onChange={this.handleStartDateChange} /><br/>
                            <span className="error">{this.state.startDateErrorDescription}</span><br/>
                            Fim da venda: <input className="input-bar" type="text" placeholder="dd/MM/aaaa" value={this.state.endDate} onChange={this.handleEndDateChange} /><br/>
                            <span className="error">{this.state.endDateErrorDescription}</span><br/>
                                <div>
                                Color: <input type="radio" value="BLACK" checked={this.state.color === 'BLACK'} onChange={this.handleColorChange} />BLACK 
                                    <input type="radio" value="WHITE" checked={this.state.color === 'WHITE'} onChange={this.handleColorChange} />WHITE 
                                    <input type="radio" value="GOLD" checked={this.state.color === 'GOLD'} onChange={this.handleColorChange} />GOLD 
                                    <input type="radio" value="PINK" checked={this.state.color === 'PINK'} onChange={this.handleColorChange} />PINK 
                                </div><br />
                            Código:<input className="input-bar" type="text" value={this.state.code} onChange={this.handleCodeChange} /><br/>
                            <span className="error">{this.state.codeErrorDescription}</span><br />
                        </label>
                        <button onClick={this.handleSubmitPhoneForm} disabled={this.checkErros()}>ADICIONAR</button>
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