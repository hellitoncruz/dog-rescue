import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.scss";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DogCardSkeleton } from "../components/Skeleton/dogs-skeleton";

type Animal = {
  id: string;
  city: string;
  dataRegistro: {
    _seconds: number;
    _nanoseconds: number;
  };
  extraInfo: string;
  image: string;
  nome: string;
  breed: string;
  tel: string;
  uf: string;
  street: string;
};

function Dogs() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDocId, setLastDocId] = useState<string | null>(null); // Último ID da consulta
  const [hasMore, setHasMore] = useState(true); // Flag para indicar se há mais registros

  const instance = axios.create({
    baseURL: "https://api-dog-rescue.vercel.app",
    timeout: 3000,
  });

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const params = {
        _limit: 5, // número de registros por página
        lastDocId: lastDocId, // Enviar o lastDocId para a query
      };

      const response = await instance.get('/dogs', { params });

      console.log("Dados da API:", response.data);

      const fetchedAnimals = response.data.data;
      const newLastDocId = response.data.lastDocId; // Último ID retornado

      // Atualiza o estado com os novos animais
      setAnimals((prev) => {
        const newAnimals = fetchedAnimals.filter((newAnimal: Animal) =>
          !prev.some((existingAnimal) => existingAnimal.id === newAnimal.id)
        );
        return [...prev, ...newAnimals];
      });

      setLastDocId(newLastDocId); // Atualiza o último ID

      // Se o número de registros retornados for menor que o limite, significa que não há mais registros
      if (fetchedAnimals.length < 5) {
        setHasMore(false); // Se 5 itens não foram retornados, não há mais dados
      } else {
        setHasMore(true);
      }

    } catch (error) {
      console.error("Erro ao buscar animais", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDogs();
  }, []); // Carrega os dados pela primeira vez

  const formatDate = (firebaseTimestamp: { _seconds: number; _nanoseconds: number }): string => {
    if (!firebaseTimestamp || typeof firebaseTimestamp._seconds !== "number") {
      return "";
    }
    const date = new Date(firebaseTimestamp._seconds * 1000);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="container py-12 dogs-container items-center flex flex-col">
      <div className="justify-center w-full mb-24 mt-12 flex items-center title">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Cães disponíveis para adoção</h1>
        </div>
      </div>

      <div className="space-y-8 card-container">
        {loading && animals.length === 0 ? (
          [...Array(3)].map((_, index) => <DogCardSkeleton key={index} />)
        ) : animals.length > 0 ? (
          animals.map((animal) => (
            <Card key={animal.id} className="overflow-hidden card">
              <CardContent className="p-0 h-full">
                <div className="flex h-full">
                  <div className="relative h-64 md:h-auto w-1/3">
                    <img src={animal.image || "/placeholder-upload-img.png"} alt={animal.breed} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex flex-col justify-between p-6 w-2/3 right-content">
                    <div>
                      <div className="mt-2 flex flex-wrap justify-between items-center card-title">
                        <h2 className="font-bold breed capitalize">{animal.breed}</h2>
                        <span className="date">{formatDate(animal.dataRegistro)}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <p className=" text-sm text-primary cityUF font-bold">{animal.city}-{animal.uf}</p>
                      </div>
                      <p className=" text-sm text-primary street font-bold">{animal.street}</p>
                      <p className="mt-4 text-muted-foreground extraInfo">{animal.extraInfo ? animal.extraInfo : "Informações extras não foram adicionadas"}</p>
                    </div>
                    <div className="mt-6">
                      <Button>
                        <a
                          href={`https://wa.me/77991942465?text=${encodeURIComponent(
                            `Olá, ${animal.nome}! \n\nEstou interessado no doguinho que você postou no Dog Rescue e gostaria de saber mais informações.\n\nRaça: ${animal.breed}\n\nVeja a foto aqui: ${animal.image}\n\nPoderia me contar mais sobre ele?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Entre em contato
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="items-center flex flex-col gap-8 new-dog">
            <p>Nenhum cão foi registrado ainda.</p>
            <a className="border flex gap-3" href="/form">
              <Plus /> Ajude a salvar um doguinho
            </a>
          </div>
        )}
      </div>

      {hasMore && (
        <Button className="mt-8 see-more" onClick={fetchDogs}>
          Ver mais
        </Button>
      )}
    </div>
  );
}

export default Dogs;
