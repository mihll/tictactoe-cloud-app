# Instrukcja do deploymentu aplikacji na AWS (Elastic Beanstalk, ECR, RDS)

## 1. Wymagania wstępne

- Posiadamy zainstalowanego Dockera
- Aplikacja spakowana jest do formy obrazów Dockerowych (najlepiej z użyciem docker-compose - ułatwi to tworzenie pliku `Dockerrun.aws.json`)

## 2. Konfiguracja ECRa

Aby móc skorzystać z obrazów Dockera do uruchomienia aplikacji z użyciem Beanstalka, musimy wrzucić zbudowane obrazy na Elastic Container Registry (ECR).

### 2.1 Tworzenie repozytoriów

Dla każdego deployowanego obrazu (w naszym przypadku jeden obraz dla back-endu i jeden dla front-endu) należy utworzyć prywatne repozytorium w ECR. Należy przejść na stronę ECRa (np. https://us-east-1.console.aws.amazon.com/ecr/) i wybrać opcję „Create repository”. Następnie podać nazwę repozytorium, pozostałe opcje zostawić domyślnie oraz zatwierdzić utworzenie repozytorium.

### 2.2 Instalacja i konfiguracja AWS CLI

Jeżeli nie posiadamy jeszcze zainstalowanego AWS CLI, należy to w tym momencie zrobić. Należy zainstalować narzędzie zgodnie z instrukcjami dla wybranej platformy (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). Następnie uruchomić polecenie `aws configure` i podać swoje dane autoryzacyjne (AWS Access Key ID oraz AWS Secret Access Key). W przypadku, kiedy posiadamy również AWS Session Token (np. Przy korzystaniu z AWS Learners Lab), należy go ręcznie dodać do pliku znajdującego się pod ścieżką `~/.aws/credentials`.

### 2.3 Pushowanie obrazów na ECR

Teraz możemy przejść do wrzucania obrazów do stworzonych wcześniej repozytoriów.
Najpierw musimy zalogować się Dockerem do naszych repozytoriów. W tym celu należy dla każdego utworzonego repozytorium wykonać następujące polecenie:

`aws ecr get-login-password | docker login --username AWS --password-stdin [URI_REPOZYTORIUM]`.

URI naszych repozytoriów widoczne jest na stronie ECRa w sekcji „Private repositories”.

Teraz możemy stworzyć nowe tagi i spushować je do repozytoriów. Dla każdego z naszych obrazów należy wykonać polecenia (zakładając, że nasz obraz ma tag „latest”):

`docker tag [NAZWA_OBRAZU]:latest [URI_REPOZYTORIUM]:latest`

np. `docker tag tictactoe-cloud-app-backend:latest 363822337133.dkr.ecr.us-east-1.amazonaws.com/tictactoe-cloud-app-backend:latest`

a następnie:

`docker push [URI_REPOZYTORIUM]:latest`

Na stronie ECRa, w szczegółach poszczególnych repozytoriów możemy sprawdzić czy widoczne są wrzucone przez nas przed chwilą obrazy.

W przypadku późniejszych zmian w aplikacji i chęci jej aktualizacji, należy ponownie zbudować poprawione obrazy, a następnie ponownie wrzucić je na repozytoria.

## 3. Tworzenie aplikacji na Elastic Beanstalk

Ponieważ zamierzamy zdeployować 2 kontenery na jednej instancji Elastic Beanstalka, musimy skorzystać z klastra ECS, w którym będą uruchomione nasze kontenery (https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecs.html).

### 3.1 Przygotowanie pliku Dockerrun.aws.json

Żeby Elastic Beanstalk mógł utworzyć odpowiedni klaster ECS z naszymi kontenerami, musimy zdefiniować pożądane środowisko ECSa. W tym celu tworzymy plik `Dockerrun.aws.json` zgody z informacjami podanymi na stronie "ECS managed Docker configuration" (https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html). 

Przykładowa konfiguracja dla 2 kontenerów:
```
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      "name": "tictactoe-cloud-app-backend",
      "image": "363822337133.dkr.ecr.us-east-1.amazonaws.com/tictactoe-cloud-app-backend:latest",
      "essential": true,
      "memory": 256,
      "portMappings": [
        {
          "hostPort": 8080,
          "containerPort": 8080
        }
      ]
    },
    {
      "name": "tictactoe-cloud-app-frontend",
      "image": "363822337133.dkr.ecr.us-east-1.amazonaws.com/tictactoe-cloud-app-frontend:latest",
      "essential": true,
      "memory": 256,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        }
      ]
    }
  ]
}
```

Zauważym, że obrazy z których mają zostać utworzon nasze kontenery, wskazują na ECRy, na których znajdują się nasze założone wcześniej repozytoria. Wystawiamy też odpowiednie porty zarówno dla back-endu jak i front-endu.

### 3.2 Utworzenie aplikacji na Elastic Beanstalk

Teraz możemy przejść do tworzenia właściwej aplikacji w usłudze Elastic Beanstalk. Przechodzimy na stronę: https://us-east-1.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/gettingStarted.

W wyświetlonym formularzu:
1. Podajemy nazwę naszej aplikacji
2. W sekcji "Platform":
- jako platformę wybieramy: `Docker`,
- jako platform branch wybieramy `ECS running on 64bit Amazon Linux 2` (bardzo istotne, w przypadku pozostawienia domyślnej opcji, nie będziemy mogli uruchomić wielu kontenerów),
- wersję platformy pozostawiamy domyślną
3. W sekcji "Application code":
- wybieramy opcję `Upload your code`,
- przesyłamy nasz wcześniej utworzony plik `Dockerrun.aws.json`
4. Klikamy na przycisk `Configure more options`:
   1. Konfigurujemy RDSa (bazę danych):
       - klikamy przycisk `Edit` w sekcji `Security`,
       - wybieramy pożądany przez nas silnik bazodanowy (`Engine`)
       - podajemy nazwę użytkownika, której będzie używała nasza aplikacja do połączenia się z bazą (`Username`) 
       - podajemy hasło, którego będzie używała nasza aplikacja do połączenia się z bazą (`Password`)
       - Co istotne, dane do łączenia się z bazą będą automatycznie dostępne dla naszej aplikacji w odpowiednich zmiennych środowiskowych (tabelka: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html)
   2. Konfigurujemy Security (Tylko w przypadku używania konta Learners Lab):
       - klikamy przycisk `Edit` w sekcji `Database`,
       - jako `Service role` wybieramy `LabRole`,
       - jako `EC2 key pair` wybieramy `vockey`,
       - jako `IAM instance profile` wybieramy `LabInstanceProfile`,
       - kikamy przycisk `Save`,
5. Na dole strony, klikamy przycisk `Create app` lub `Create application`

Czekamy aż nasza aplikacja się zdeployuje (pierwsze uruchomienie trwa ok. 30 minut).

### 3.3 Konfiguracja portów

Domyślnie serwer aplikacji ma otwarty na połączenia przychodzące jedynie port `80`. W naszym przypadku, jest to port, pod którym dos†ępny będzie front-end. Jeżeli chcemy jednak, aby nasza apliakcja funkcjonowała poprawnie, musimy otworzyć również port `8080`, na którym dostępna będzie część back-endowa.

W tym celu musimy przejść do dashboardu EC2 (https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Home) i z menu po lewej wybrać opcję `Security Groups` w sekcji `Netowrk & Security`.

Następnie musimy wybrać naszą `Security group` utworzoną dla deplojowanej apikacji (jej zazwa to będzie nazwa environmentu z Elastic Beanstalka). Zaznaczamy ją na liście - poniżej zostaną wyświetlone jej szczegóły. Przechodzimy do zakłądki `Inbound rules` i klikamy przycisk `Edit inbound rules`. Następnie klikamy przycisk `Add rule` - jako typ nowej reguły wybieramy `Custom TCP`, a jako `Port range` podajemy nasz port pod którym działa back-end (w naszym przypadku port `8080`). Następnie jako `Source` wybieramy `0.0.0.0/0` - pozwalamy na komunikację z dowolnym adresem IP. Następnie zapisujemy reguły, klikając przycisk `Save rules`.

Od teraz back-end powinien być dostępny na porcie `8080`.

## 4. Używanie aplikacji
Nasza aplikacja jest dostępna pod adresem, który wyświetla się w panelu `Environment` w Elastic Beanstalku. Po jego odwiedzeniu powinniśmy widzieć naszą aplikację.