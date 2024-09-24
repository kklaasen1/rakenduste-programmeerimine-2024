const user = {
    name: 'Karmen Klaasen',
    imageUrl: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg',
    imageSize: 90,
  };
  
  export default function Profile() {
    return (
      <>
        <h2>{user.name}</h2>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize
          }}
        />
      </>
    );
  }
