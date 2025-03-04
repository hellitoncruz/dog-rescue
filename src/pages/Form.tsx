"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import Select1 from "react-select";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import '../styles.scss'
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/ui/loading";
import { toast, Toaster } from "sonner"
import { Plus } from "lucide-react";

// Tipos para os dados do formulário
type Inputs = {
  nome: string;
  uf: string;
  city: string;
  tel: string;
  extraInfo?: string
  image?: FileList;
  street: string;
  breed: string;
};

type IbgeUFs = { nome: string; id: string; sigla: string };
type IbgeCities = { nome: string; id: string };

const formSchema = z.object({
  nome: z.string()
    .nonempty("Nome é obrigatório")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i, "Apenas letras e espaços são permitidos"),
  tel: z.string()
    .nonempty("Telefone é obrigatório")
    .regex(/^\d{10,11}$/, "Formato inválido. Use (XX) XXXXX-XXXX"),
  uf: z.string().min(2, "Selecione um estado"),
  city: z.string().min(2, "Selecione uma cidade"),
  street: z.string().nonempty("Rua é obrigatório"),
  breed: z.string().nonempty("Raça é obrigatório"),
  image: z.instanceof(FileList)
    .refine((files: any) => files.length > 0, "A imagem é obrigatória")
    .refine((files: any) => {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      return allowedTypes.includes(files[0].type);
    }, "O formato da imagem deve ser JPG ou PNG"),
  extraInfo: z.string().optional(),
});

export default function Form() {
  const { register, reset, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      tel: "",
      uf: "",
      city: "",
      street: "",
      breed: "",
      extraInfo: ""
    },
  });

  const [UFs, setUFs] = useState<IbgeUFs[]>([]);
  const [cities, setCities] = useState<IbgeCities[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const selectedUf = watch("uf");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOtherBreed, setIsOtherBreed] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name);
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setValue("image", e.target.files as FileList, { shouldValidate: true })
    } else {
      setImagePreview(null)
      setValue("image", e.target.files ?? new DataTransfer().files, { shouldValidate: true })
    }
  }

  const dogBreeds = [
    { value: "Sem Raça Definida", label: "Vira-lata (SRD)" },
    { value: "pinsher", label: "Pinscher" },
    { value: "poodle", label: "Poodle" },
    { value: "salsicha", label: "Salsicha" },
    { value: "pitbull", label: "Pitbull e misturas" },
    { value: "golden", label: "Labrador e Golden Retriever (misturados)" },
    { value: "outro", label: "Outro (Digite manualmente)" }
  ];


  useEffect(() => {
    axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then(response => setUFs(response.data))
  }, []);

  useEffect(() => {
    if (selectedUf) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => setCities(response.data))
    }
  }, [selectedUf]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("uf", data.uf);
      formData.append("city", data.city);
      formData.append("tel", data.tel);
      formData.append("street", data.street);
      formData.append("breed", data.breed);
      if (data.extraInfo) formData.append("extraInfo", data.extraInfo)

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await axios.post("https://api-dog-rescue.vercel.app/dogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast.success('Registro criado com sucesso!', {
        description: 'Obrigado por ajudar um doguinho!'
      })
      reset();
      setFileName(null)
      setImagePreview(null);
    }
    catch (error) {
      setLoading(false)
      toast.error('Ocorreu algo de errado no envio do registro!', {
        description: 'Revise os dados e tente novamente.'
      })
      console.error("Erro ao enviar formulário: ", error);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="register-content">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="mt-4 mb-8">Ajude um Doguinho em situação vulnerável</CardTitle>
          <CardDescription className="mt-8">Preencha este formulário com as informações necessárias para ajudar a resgatar mais um cão.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4">
          <div className="space-y-2">
            <Label>Nome Completo</Label>
            <Input id="nome" {...register("nome", { required: "Campo Nome é obrigatório" })} placeholder="Seu Nome Completo" />
            {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
          </div>

          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input id="tel" {...register("tel", { required: "Campo Telefone é obrigatório" })} placeholder="(DD) XXXXX-XXXX" />
            {errors.tel && <span className="text-red-500 text-sm">{errors.tel.message}</span>}
          </div>

          <div className="space-y-2">
            <Label>Estado</Label>
            <Select
              onValueChange={(value) => setValue("uf", value, { shouldValidate: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu estado (UF)" />
              </SelectTrigger>
              <SelectContent className="bg-white uf-field">
                {UFs.map((uf) => (
                  <SelectItem key={uf.id} value={uf.sigla}>{uf.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.uf && <span className="text-red-500 text-sm">{errors.uf.message}</span>}
          </div>

          <div className="space-y-2">
            <Label>Cidade</Label>
            <Select onValueChange={(value) => setValue("city", value, { shouldValidate: true })} >
              <SelectTrigger>
                <SelectValue className="city-field" placeholder="Selecione sua cidade" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.nome}>{city.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
          </div>

          <div className="space-y-2">
            <Label>Rua</Label>
            <Input id="street" {...register("street", { required: "Campo Rua é obrigatório" })} placeholder="Rua/Lougradouro" />
            {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
          </div>

          <div className="space-y-2">
            <Label>Raça do cachorro</Label>
            <Select1
              options={dogBreeds}
              placeholder="Selecione ou busque a raça"
              isSearchable
              onChange={(selectedOption) => {
                const isOther = selectedOption?.value === "outro";
                setIsOtherBreed(isOther);
                setValue("breed", isOther ? "" : selectedOption?.value ?? "", { shouldValidate: true });
              }}
            />

            {isOtherBreed && (
              <Input
                id="breed"
                placeholder="Digite a raça"
                {...register("breed", { required: "Campo Raça é obrigatório" })}
                onChange={(e) => setValue("breed", e.target.value, { shouldValidate: true })}
              />
            )}

            {errors.breed && <span className="text-red-500 text-sm">{errors.breed.message}</span>}
          </div>

          <div className="space-y-2">
            <p className="text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">Imagem do cão em situação vulnerável</p>
            <label
              htmlFor="image"
              className="gap-3 justify-center items-center bg-white flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer border p-3  text-gray-600"
            >
              {fileName || <><Plus /> Escolher uma imagem</>}
            </label>
            <Input
              id="image"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="mt-2 flex justify-center">
              <img
                src={imagePreview ? imagePreview : "/placeholder-upload-img.png"}
                alt="Preview"
                className="h-40 w-auto object-cover"
              />
            </div>
            {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
          </div>

          <div className="space-y-2">
            <Label>Descrição (Opcional)</Label>
            <Textarea placeholder="Descreva a situação do animal com o máximo de informações que puder.."
              className="min-h-32" id="extraInfo" {...register("extraInfo")} />
          </div>

          <Button type="submit" className="w-full submit" onClick={handleSubmit(onSubmit)}>
            {loading ? <Loading /> : 'Enviar'}
          </Button>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}