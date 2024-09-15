
def Check(nombre):
    r=len(set(
        [char for pos,char in enumerate(list(nombre[:-1].lower()
                                                        .translate(str.maketrans('áéíóú','aeiou'))),start=1) 
            if pos%2==0 and char in ['a','e','i','o','u']])
        )
    return r!=0 and r%2==0

open('/home/josemanuel/resultado_python.txt','w').writelines(
    list(
        filter(Check,
               open('/home/josemanuel/personal.txt','r').readlines()))
    )