/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViaCepAddress } from '@app/shared/models/cep';
import { RequestedAddress } from '@sharedMd/cep';
import { Observable } from 'rxjs';

@Injectable()
export class GetAddressService {
  public readonly viaCepUrl = 'https://viacep.com.br/ws';
  public requestedAddress!: RequestedAddress;

  constructor(private readonly httpClient: HttpClient) {}

  public getAddressData(cep: string): Observable<ViaCepAddress> {
    const endpoint = `${this.viaCepUrl}/${cep}/json`;

    return this.httpClient.get<ViaCepAddress>(endpoint);
  }
}
