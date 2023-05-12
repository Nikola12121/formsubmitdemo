class Validator {
    constructor(config) {
        this.elementsconfig = config
        this.errors = {}

        this.generateErrorsObject()
        this.inputListener() } 
        
        generateErrorsObject() {
            for(let field in this.elementconfig) {
                this.errors[field] = []
            }
        }

        inputListener() {
            let inputSelector = this.elementsconfig

            for(let field in inputSelector) {
                let selector = `input[name="${field}"]`
                let el = document.querySelector(selector)

                el.addEventListener('input', this.validate.bind(this))
            }
        }

        validate(e) {
            let elfields = this.elementsconfig
            let field = e.target
            let fieldName = field.getAttribute('name')
            let fieldValue = field.value
            let zip = document.querySelector('#ZIP_Code')
            let zipName = zip.getAttribute('name')
            let zipValue = zip.value
            
            let zipvaluestring = toString(zipValue)
            
           console.log(field.key)
            

            this.errors[fieldName] = []

            if(elfields[fieldName].required) {
                if(fieldValue === '') {
                    this.errors[fieldName].push('Polje je prazno')
                }
            }

            if(elfields[fieldName].email) {
                if(!this.validateEmail(fieldValue)) {
                    this.errors[fieldName].push('Neispravna email adresa')
                }
            }

            if(fieldValue.length < elfields[fieldName].minlength) {
                this.errors[fieldName].push(`Polje mora imati minimalno ${elfields[fieldName].minlength} karaktera`)
               
            }
            
            if(fieldValue.length > elfields[fieldName].maxlength) {
                this.errors[fieldName].push(`Polje mora imati maximalno ${elfields[fieldName].maxlength} karaktera`)
            }

           

            

            /*if(zipValue.length < elfields[zipName].minlength) {
                
                
                this.errors[zipName].push(`Polje mora imati minimalno ${elfields[zipName].minlength} karaktera`)
    
                }*/
            
                
            
            

            if(elfields[fieldName].matching) {
                let matchingel = document.querySelector(`input[name="${elfields[fieldName].matching}"]`)

                if(fieldValue !== matchingel.value) {
                    this.errors[fieldName].push('Lozinke se ne poklapaju')
                }

                if(this.errors[fieldName].length === 0) {
                    this.errors[fieldName] = []
                    this.errors[elfields[fieldName].matching] = []
                }

                
            }

            this.populateErrors(this.errors);   


        }

        populateErrors(errors) {
            for(const elem of document.querySelectorAll('ul')) {
                elem.remove()
            }

            for(let key of Object.keys(errors)) {
                let paretElement = document.querySelector(`input[name="${key}"]`).parentElement
                let errorsElement = document.createElement('ul')
                paretElement.appendChild(errorsElement)

                errors[key].forEach(error => {
                    let li = document.createElement('li')
                    li.innerText = error

                    errorsElement.appendChild(li)
                })
                    
                
            }
        }

        validateEmail(email) {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true
            }
        
            return false
      
        }
        
    }




    