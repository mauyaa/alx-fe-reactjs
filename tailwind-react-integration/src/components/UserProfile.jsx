// src/components/UserProfile.jsx
const avatarSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTAgMTUwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgcng9IjI0IiBmaWxsPSIjM2I4MmY2Ii8+PGNpcmNsZSBjeD0iNzUiIGN5PSI2MCIgcj0iMjgiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTM4IDEzMmMwLTI0IDE4LTQ0IDM3LTQ0czM3IDIwIDM3IDQ0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=='

function UserProfile() {
  return (
    <div
      className="bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={avatarSrc}
        alt="User"
        className="block rounded-full w-24 h-24 md:w-36 md:h-36 mx-auto transition-transform duration-300 ease-in-out hover:scale-110"
      />
      <h1 className="text-lg md:text-xl text-blue-800 hover:text-blue-500 my-4 text-center transition-colors duration-200">
        John Doe
      </h1>
      <p className="text-gray-600 text-sm md:text-base text-center">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  )
}

export default UserProfile
