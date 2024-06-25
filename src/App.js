import React, { useState, useEffect } from 'react';
import Slider from './components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Euro } from 'lucide-react';

const Dashboard = () => {
  const [valoriProiecte, setValoriProiecte] = useState(100000);
  const [comisionAncuta, setComisionAncuta] = useState(5);
  const [cheltuieliMarketing, setCheltuieliMarketing] = useState(10);
  const [comisionPersonal, setComisionPersonal] = useState(5);

  const [venitAncuta, setVenitAncuta] = useState(0);
  const [venitPersonal, setVenitPersonal] = useState(0);
  const [costuriEffectiveMarketing, setCosturiEffectiveMarketing] = useState(0);

  useEffect(() => {
    const venitBrutAncuta = (valoriProiecte * comisionAncuta) / 100;
    const cheltuieliMarketingValoare = (venitBrutAncuta * cheltuieliMarketing) / 100;
    const venitNetAncuta = venitBrutAncuta - cheltuieliMarketingValoare;
    setVenitAncuta(venitNetAncuta);
    setCosturiEffectiveMarketing(cheltuieliMarketingValoare);

    const venitPersonalCalculat = (venitNetAncuta * comisionPersonal) / 100;
    setVenitPersonal(venitPersonalCalculat);
  }, [valoriProiecte, comisionAncuta, cheltuieliMarketing, comisionPersonal]);

  const chartData = [
    { name: 'Venit ANCUȚA', value: venitAncuta },
    { name: 'Venit Personal', value: venitPersonal },
    { name: 'Costuri Marketing', value: costuriEffectiveMarketing },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Dashboard Proiecții Financiare</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="flex items-center">
              <Euro className="mr-2" />
              VALORI PROIECTE
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Slider
              min={100000}
              max={1000000}
              step={10000}
              value={[valoriProiecte]}
              onValueChange={(value) => setValoriProiecte(value[0])}
              className="mb-4"
            />
            <p className="text-lg font-semibold text-blue-600">
              Valoare: {valoriProiecte.toLocaleString()} €
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-green-500 text-white">
            <CardTitle>Comision ANCUȚA</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Slider
              min={5}
              max={10}
              step={1}
              value={[comisionAncuta]}
              onValueChange={(value) => setComisionAncuta(value[0])}
              className="mb-4"
            />
            <p className="text-lg font-semibold text-green-600">
              Valoare: {comisionAncuta}%
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-yellow-500 text-white">
            <CardTitle>Cheltuieli Marketing</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Slider
              min={10}
              max={30}
              step={5}
              value={[cheltuieliMarketing]}
              onValueChange={(value) => setCheltuieliMarketing(value[0])}
              className="mb-4"
            />
            <p className="text-lg font-semibold text-yellow-600">
              Valoare: {cheltuieliMarketing}%
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-purple-500 text-white">
            <CardTitle>Comision Personal</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Slider
              min={5}
              max={20}
              step={1}
              value={[comisionPersonal]}
              onValueChange={(value) => setComisionPersonal(value[0])}
              className="mb-4"
            />
            <p className="text-lg font-semibold text-purple-600">
              Valoare: {comisionPersonal}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-lg">
        <CardHeader className="bg-red-500 text-white">
          <CardTitle>Rezultate</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">Venit ANCUȚA</p>
              <p className="text-2xl font-bold">{venitAncuta.toLocaleString()} €</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-purple-600">Venit Personal</p>
              <p className="text-2xl font-bold">{venitPersonal.toLocaleString()} €</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-yellow-600">Costuri Marketing</p>
              <p className="text-2xl font-bold">{costuriEffectiveMarketing.toLocaleString()} €</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
