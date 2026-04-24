import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { UserProfileDto, UpdateProfileDto, ChangePasswordDto } from '../../../../core/models/user.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfileDto | null = null;
  updateData: UpdateProfileDto = { name: '' };
  passwordData: ChangePasswordDto = { currentPassword: '', newPassword: '' };
  
  isLoading = true;
  isUpdatingProfile = false;
  isChangingPassword = false;

  profileMessage = '';
  profileError = '';
  passwordMessage = '';
  passwordError = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (res) => {
        if (res.data) {
          this.profile = res.data;
          this.updateData.name = res.data.name;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.profileError = 'Failed to load profile data.';
      }
    });
  }

  onUpdateProfile(): void {
    this.isUpdatingProfile = true;
    this.profileMessage = '';
    this.profileError = '';

    this.userService.updateProfile(this.updateData).subscribe({
      next: (res) => {
        if (res.success || res.data) {
          this.profileMessage = res.message || res.data || 'Profile updated successfully.';
          if (this.profile) this.profile.name = this.updateData.name;
        } else {
          this.profileError = res.message || 'Failed to update profile.';
        }
        this.isUpdatingProfile = false;
      },
      error: (err) => {
        this.profileError = err.error?.message || 'Error updating profile.';
        this.isUpdatingProfile = false;
      }
    });
  }

  onChangePassword(): void {
    this.isChangingPassword = true;
    this.passwordMessage = '';
    this.passwordError = '';

    this.userService.changePassword(this.passwordData).subscribe({
      next: (res) => {
        if (res.success || res.data) {
          this.passwordMessage = res.message || res.data || 'Password changed successfully.';
          this.passwordData = { currentPassword: '', newPassword: '' };
        } else {
          this.passwordError = res.message || 'Failed to change password.';
        }
        this.isChangingPassword = false;
      },
      error: (err) => {
        this.passwordError = err.error?.message || 'Error changing password.';
        this.isChangingPassword = false;
      }
    });
  }
}
