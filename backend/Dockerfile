FROM golang:1.21.5
RUN apt-get update && apt-get install -y build-essential make

RUN go mod init github.com/t-tosh/GoProject
# RUN go install github.com/golang-jwt/jwt/v5
# RUN go install github.com/gin-gonic/gin@HEAD
# RUN go install gorm.io/gorm
# RUN go install github.com/go-sql-driver/mysql@HEAD


WORKDIR /go/src

COPY go* ./
RUN go mod download

COPY . .