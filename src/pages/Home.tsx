import '../styles.scss'
import { Button } from "@/components/ui/button"
import { HeartHandshake, PawPrint, House } from "lucide-react"

function Home() {

  return (
    <div className="flex flex-col home">
      {/* Hero Banner */}
      <section className="relative h-[500px] w-full">
        <img
          src="/undefined_image (1).png"
          alt="Dogs in need"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70">
          <div className="container flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Todo Cão Merece um Lar</h1>
            <p className="mt-4 max-w-2xl text-lg text-white md:text-xl">
              Junte-se a nós para transformar vidas! Ajude um cão de rua cadastrando, adotando ou contribuindo com doações.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild variant="outline" size="lg" className='btn-hero bg-white'>
                <a href="/form">Ajude um doguinho</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-hero bg-white">
                <a href="/dogs">Conheça Nossos Cães</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 our-mission">
        <div className="container">
          <div className="mx-auto text-center items-center flex flex-col gap-4">
            <h2 className="text-3xl font-bold md:text-4xl border-current">NOSSA MISSÃO</h2>
            <span className='line'></span>
            <p className="mt-4 text-lg text-muted-foreground">
            Nosso objetivo é conectar pessoas dispostas a transformar a vida de cães em situação de rua, seja por meio do resgate, adoção ou doação de suprimentos essenciais. Juntos, podemos oferecer uma segunda chance para esses amiguinhos de quatro patas encontrarem um lar seguro e cheio de carinho.
            </p>
          </div>

          <div className="mt-8 services-content services">
            <div className="wrapper">
              <div className="cols">
                <div className="col">
                  <div className="container">
                    <div className="front">
                      <div className="inner service1">
                        <PawPrint className="h-8 w-8 text-primary icon" />
                        <p>Adoção</p>
                      </div>
                    </div>
                    <div className="back">
                      <div className="inner service1">

                        <p className="m-0">Facilitamos a adoção responsável, conectando cães resgatados a famílias que lhes darão um lar definitivo.</p>
                        <div className="overlay"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="container">
                    <div className="front">
                      <div className="inner service2">
                        <HeartHandshake className="h-8 w-8 text-primary icon" />
                        <p>Reabilitação</p>
                      </div>
                    </div>
                    <div className="back">
                      <div className="inner service2">

                        <p className="m-0">Apoie o tratamento, socialização e preparo de cães resgatados para que encontrem um lar amoroso.</p>
                        <div className="overlay">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="container">
                    <div className="front">
                      <div className="inner service3">
                        <House className="h-8 w-8 text-primary icon" />
                        <p>Resgate</p>
                      </div>
                    </div>
                    <div className="back">
                      <div className="inner service3">
                        <p className="m-0">Permita que cães em situação de rua sejam cadastrados para receber ajuda. Conectamos voluntários para oferecer abrigo seguro e cuidados imediatos.</p>
                        <div className="overlay">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className='colaborate' >
              <a className='text-xl' href="/form">Participe</a>
            </Button>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Home
