# ATM-Facial-Recognition-System
A facial recognition system for authentication.

## Usage
Send a JSON object of the form to port 3000:

```
{ 
	type: "authenticate",
	image: "Base64Image"
}
```
## Image constraints
- Dimensions must be 200X200 and above.
