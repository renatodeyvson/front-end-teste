import React, { Component } from 'react';
import api from '../services/api';
import './main.css';

export default class Main extends Component {
    state = {
        phones: []
    }

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
        const { phones } = this.state;

        return (
            <div className="phone-list">
                {phones.map(phone => (
                    <article key={phone._id}>
                        <img src={phone.photo} alt={phone.brand+' '+phone.model}></img><br />
                        <strong>{phone.brand+' '+phone.model}</strong><br />
                        <strong className="price">R${phone.price}</strong>
                        <p>Modelo: {phone.model}, Marca: {phone.brand}, Cor: {phone.color}, Código: {phone.code}, Data de início da venda: {phone.startDate}, Data de fim da venda: {phone.endDate}</p>
                    </article>
                ))}
            </div>
        );
    }
}