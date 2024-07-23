import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  //general components
  addButtonContainer: {
    marginTop: 20,
    alignSelf: 'flex-end',
    marginBottom: 13,
    marginRight: 0
  },
  container: {
    flex: 1,
  },
  bodyText: {
    color: colors.grey,
    fontSize: 16,
  },
  bodyTextBold: {
    color: colors.grey,
    fontSize: 16,
    fontWeight: "bold"
  },
  textWhite: {
    fontSize: 18,
    color: colors.white
  },
  image: {
    color: colors.agave,
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    resizeMode: 'contain', // To keep the image aspect ratio
    marginBottom: 20, // Add spacing if needed
  },
  //login components
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  generalContainer: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 10
  },
  //account components
  accountItem: {
    backgroundColor: colors.agave,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  logoutButtonContainer: {
    backgroundColor: colors.darkeragave,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    color: colors.grey,
  },
  header: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: colors.darkeragave,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: colors.agave,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    placeholderColor: colors.lightgreen,
  },
  button: {
    backgroundColor: colors.agave,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Add margin top to the login button
  },
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,  // Adjust size to make it circular
    height: 55, // Adjust size to make it circular
    borderRadius: 55, // Half of the width and height to make it circular
    backgroundColor: colors.agave, // Example background color
  },
  roundButtonText: {
    color: "white",
    fontSize: 25,
    // fontWeight: 'bold',
  },
  buttonText: {
    color: colors.grey,
    fontSize: 16,
  },
  error: {
    color: colors.red,
    marginBottom: 10,
  },
  link: {
    color: colors.blue,
  },
  linkText: {
    color: colors.grey,
    marginBottom: 10,
    marginTop: 20, // Add margin top to the sign-up link
  },
  formContainer: {
    width: '100%',
  },
  loader: {
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  //expense screen components
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    color: colors.darkeragave
  },
  expenseDatePicker: {
    color: colors.darkeragave,
    fontSize: 18
  },
  expenseViewContainer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
      flex: 1,
  },
  expenseName: {
    color: colors.grey,
      fontSize: 16,
      fontWeight: 'bold',
  },
  expenseAmount: {
      fontSize: 16,
      color: colors.darkeragave,
  },
  expenseType: {
      fontSize: 14,
      color: colors.agave,
      
  },
  expenseSectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: colors.darkeragave
  },
  expenseSectionHeaderText: {
      fontSize: 15,
      fontWeight: 'bold',
  },
  //add account screen components 
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    marginRight: 5,
    minWidth: 90,
},
dateInput: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
},
dateText: {
  fontSize: 16,
  color: '#333',
},
expenseTypeInput: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
},
expenseTypeText: {
  fontSize: 16,
  color: '#333',
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  width: '80%',
  maxHeight: '80%',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
expenseTypeItem: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
expenseTypeItemText: {
  fontSize: 16,
},
modalCloseButton: {
  marginTop: 20,
  padding: 10,
  backgroundColor: '#ddd',
  borderRadius: 5,
  alignItems: 'center',
},
modalCloseButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
},
modalButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: 20,
},
modalButton: {
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  width: '40%',
},
modalButtonText: {
  color: 'white',
  fontSize: 16,
},
addExpenseInput: {
  flex: 1,
  height: 40,
  borderColor: colors.agave,
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 15,
  marginBottom: 10,
  backgroundColor: colors.white,
},
addExpenseButton: {
  // flex: 1,
  backgroundColor: colors.agave,
  padding: 10,
  borderRadius: 13,
  alignItems: 'center',
  marginBottom: 10
},
//users style
userContainer: {
  padding: 10,
  flex: 1,
  justifyContent: "space-between",
  flexDirection: "row",
  paddingHorizontal: 10,
  marginTop: 10,
  alignItems: "center",
  },
});

export default styles;
