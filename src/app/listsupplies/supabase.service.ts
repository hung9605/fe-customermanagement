import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      'https://feohuhtfxoektxwfgaep.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlb2h1aHRmeG9la3R4d2ZnYWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NjQ1ODcsImV4cCI6MjA3MTU0MDU4N30.C3UxcyWe3HRx9rG_ie7rkxjU95TvbZZydcZjEqgeovU'
    );
  }

  getClient() {
    return this.supabase;
  }

  async createBucket(bucketName: string) {
    const { data, error } = await this.supabase.storage.createBucket(bucketName, {
      public: true
    });

    if (error) throw error;
    return data;
  }

  async uploadFile(bucketName: string, path: string, file: File) {
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    return data;
  }

  getPublicUrl(bucketName: string, path: string) {
    const { data } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(path)
    return data.publicUrl;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  }



}
