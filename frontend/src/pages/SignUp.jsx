import { useState } from 'react'
import { ShipWheelIcon } from "lucide-react"
import { Link } from 'react-router'
import useSignUp from '../hooks/useSignUp'
import { useThemeStore } from '../store/useThemeStore'
const SignUp = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { error, isPending, signupMutation } = useSignUp()

  const handleSignup = (e) => {
    e.preventDefault()
    signupMutation(signupData)
  }
  const {theme} = useThemeStore()
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme={theme}>
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Crie sua conta</h2>
                  <p className="text-sm opacity-70">
                    Conecte-se com estudantes de idiomas do mundo todo e aprenda se divertindo!
                  </p>

                </div>
                {error && (
                  <div className="alert alert-error mb-4">
                    <span>{error.response.data.message}</span>
                  </div>
                )}
                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Nome completo</span>
                    </label>
                    <input type="text" placeholder='Digite seu nome' className="input input-bordered w-full" value={signupData.fullName} onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} required />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Digite seu email"
                      className="input input-bordered w-full" value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Senha</span>

                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full" value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
                    <p className="text-xs opacity-70 mt-1">
                      A senha deve ter no mínimo 6 caracteres
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />

                      <span className="text-xs leading-tight">
                        Eu concordo com os{" "}
                        <span className="text-primary hover:underline">Termos de serviço</span> e{" "}
                        <span className="text-primary hover:underline">Política de privacidade</span>
                      </span>
                    </label>
                  </div>

                </div>
                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (<>
                    <span className="loading loading-spinner loading-xs"></span>
                    Carregando...
                  </>
                  ) : (
                    "Criar conta"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Já possui uma conta?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Fazer login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">

            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-bro.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h1 className="text-xl font-semibold">Aprenda mais com o StreamFy</h1>
              <p className="opacity-70">
                Pratique seus idiomas, faça amizades e melhore suas habilidades em um único lugar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp