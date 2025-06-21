
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin } from "lucide-react";

const Contato = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">CONTATO</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Telefone</h3>
              <p className="text-gray-600">0800 042 0516</p>
              <p className="text-gray-600">(11) 9 1838-9540</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email</h3>
              <p className="text-gray-600">comercial@loopchat.com.br</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Endereço</h3>
              <p className="text-gray-600">Avenida Paulista, nº 1471</p>
              <p className="text-gray-600">São Paulo - SP</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
              Fale Conosco
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
