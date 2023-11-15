interface Location {
    lat: number;
    lng: number;
}

interface AddressData {
    postalCode: string | undefined;
    streetName: string | undefined;
    city: string | undefined;
    state: string | undefined;
    country: string | undefined;
    formattedAddress: string;
    location: Location;
    countryCode: string | undefined;
}

// Suponha que esta seja a definição da interface para os componentes de endereço
interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

async function buscarDadosPorCep(zipCode: string): Promise<AddressData | null> {
    const apiKey = 'SUA_CHAVE_API';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;

    const getCityNameComponent = (addressComponents: AddressComponent[], ...types: string[]) => {
        for (const type of types) {
            const component = addressComponents.find(component => component.types.includes(type));
            if (component) return component.long_name;
        }
        return '';
    };

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const results = data.results[0];
            const addressComponents = results.address_components as AddressComponent[];
            const formattedAddress = results.formatted_address;
            const location: Location = results.geometry.location;

            const postalCode = addressComponents.find(component => component.types.includes('postal_code'))?.long_name;
            const streetName = addressComponents.find(component => component.types.includes('route'))?.long_name;
            const city = getCityNameComponent(addressComponents, 'locality', 'administrative_area_level_2');
            const state = addressComponents.find(component => component.types.includes('administrative_area_level_1'))?.long_name;
            const country = addressComponents.find(component => component.types.includes('country'))?.long_name;
            const countryCode = addressComponents.find(component => component.types.includes('country'))?.short_name;

            return {
                postalCode,
                streetName,
                city,
                state,
                country,
                formattedAddress,
                location,
                countryCode
            };
        } else {
            throw new Error('Não foi possível obter dados para o CEP fornecido.');
        }
    } catch (error) {
        console.error('Erro na API de Geocoding:', error);
        return null;
    }
}

export type { AddressData };
export { buscarDadosPorCep };
