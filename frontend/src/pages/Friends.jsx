import { useQuery } from "@tanstack/react-query"
import { getUserFriends } from "../lib/api"
import { useState, useMemo } from "react"
import { Link } from "react-router"
import { UsersIcon, SearchIcon } from "lucide-react"
import FriendCard from "../components/FriendCard"
import NoFriendsFound from "../components/NoFriendsFound"
import { capitialize } from "../lib/utils"

const Friends = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  const [filters, setFilters] = useState({
    native: "",
    learning: "",
    location: "",
    name: "",
  })

  // 🔍 Aplica os filtros localmente
  const filteredFriends = useMemo(() => {
    return friends.filter((friend) => {
      const matchesNative =
        !filters.native || friend.nativeLanguage === filters.native
      const matchesLearning =
        !filters.learning || friend.learningLanguage === filters.learning
      const matchesLocation =
        !filters.location ||
        friend.location?.toLowerCase().includes(filters.location.toLowerCase())
      const matchesName =
        !filters.name ||
        friend.fullName.toLowerCase().includes(filters.name.toLowerCase())

      return (
        matchesNative && matchesLearning && matchesLocation && matchesName
      )
    })
  }, [friends, filters])


 
const nativeLanguages = [
  ...new Set(
    friends.map((f) => f.nativeLanguage?.toLowerCase()).filter(Boolean)
  ),
]

const learningLanguages = [
  ...new Set(
    friends.map((f) => f.learningLanguage?.toLowerCase()).filter(Boolean)
  ),
]


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Meus amigos
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Solicitações de amizade
          </Link>
        </div>

        {/* Filtros */}
        <div className="card bg-base-200 p-4 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar por nome"
            className="input input-bordered w-full sm:max-w-xs"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <select
            className="select select-bordered w-full sm:max-w-xs"
            value={filters.native}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, native: e.target.value }))
            }
          >
            <option value="">Idioma nativo</option>
            {nativeLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {capitialize(lang)}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full sm:max-w-xs"
            value={filters.learning}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, learning: e.target.value }))
            }
          >
            <option value="">Estuda</option>
            {learningLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {capitialize(lang)}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Localização"
            className="input input-bordered w-full sm:max-w-xs"
            value={filters.location}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>

        {/* Lista de amigos */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : filteredFriends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFriends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Friends
