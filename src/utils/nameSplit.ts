export default function nameSplit(name: string) {
  let firstName: string = "";
  let middleName: string = "";
  let lastName: string = "";

  // Split the name by spaces
  const namesArr = name?.split(" ");

  if (namesArr?.length === 3) {
    firstName = namesArr[0];
    middleName = namesArr[1];
    lastName = namesArr[2];
  } else if (namesArr?.length === 2) {
    firstName = namesArr[0];
    lastName = namesArr[1];
  } else if (namesArr?.length === 1) {
    throw new Error("firstname and lastname are required");
  }

  return [firstName, middleName, lastName];
}
